+++
title = "Gamma Engine BSP Code Translated"
description = "A C translation of the BSP tree generation function which I wrote for the Gamma Engine project."
date = 2024-12-09
[taxonomies]
tags=["scratch", "c", "pseudocode"]
+++

Here is the BSP tree generation code for Gamma Engine. It creates a solid-leaf BSP tree, given a set of polygons from a lazy mesh. I originally wrote this in Scratch, but wanted to make a more understandable translation in pseudocode. After writing a quick pseudocode, and realizing it would actually be useful(and more fun!) to outright write it in C, I decided to just simply make the entire function along with its structure defs in C language. I decided to keep the pseudocode anyways since it was an important step I used to translate the Scratch code into C. The C/pseudocode is provided below the scratch blocks.


<div class="figure2">
    <img src ="bspgeneratetreescratch.png"/>
</div>

This was the translated pseudocode I threw together overnight. It's full of problems and might not be very helpful to read, but I'm keeping it because it did help me write the C code in the snippet further below this one.

```txt
function bsp_gen(lower, upper, side, parent)
    IF upper.next = lower THEN
        add_node(null, null, null, side, parent) //adds a solid leaf
        return
    greedy_select_pivot(lower, upper)
    gen_bounding_geometry(lower, upper)
    IF pivot = null THEN
        stabilize_sort(lower, upper)
        IF not right? THEN
            add_node(null, null, null, side, parent)
            return
        add set to air leaf, inherit parent
        add_node(lower, upper, null, side, parent) //add air leaf
    ELSE
        partition(lower, upper)
        IF parent = null THEN
            add_node(partitionhead, pivot, &pivot, null, parent) //adds an internal node 
        ELSE
            add_node(partitionhead, pivot, &pivot, side, parent)
        bsp_gen(lower, pivot, left, *newnode)
        bsp_gen(lower.next, upper, right, *newnode)

```

... And I wrote the C translation, starting with all of the typedefs specific to the program:

```h,linenos
typedef struct plane_s
{
    vec3_t              normal, point;
    struct plane_s      *hash_chain;
} plane_t;

typedef struct ptnplane_s {
    int                 planenum;
    int                 tested;	
    struct ptnplane_s   *original;
} ptnplane_t;

typedef struct face_s {
    struct face_s       *next;
    winding_t           *w;
    int                 planenum;
    int                 numverts;
    ptnplane_t          *original
} face_t;

typedef struct node_s {
    // leaves and internal nodes
    int                 planenum;           // -1 = leaf node
    struct node_s       *parent;
    vec3_t              minb, maxb;
    // nodes only
    ptnplane_t          *ptnplane;
    struct node_s       *children[2];
    // leaves only
    face_t              *facelist;
} node_t;

```

(I did not include the any of the more general typedefs such as <code>vec3_t</code> and <code>winding_t</code>, but you would need them in order to describe the geometric primitives)

... And then the definitions of <code>bspgen</code>:


```c,linenos
node_t *bspgen(node_t *node, face_t *faces) {
    node_t              *newnode;
    ptnplane_t          *pivot;

    pivot = greedyselect(faces);
    if (!pivot) {
        // We add a leaf
        node->side = NULL;
        node->planenum = -1;
        node->facelist = faces;
        return node;
    }

    node->ptnplane = pivot;
    node->planenum = pivot->planenum & ~1;  // From Quake II. It's a bit less trivial in Scratch
    
    newnode = allocnode();
    newnode->parent = node;
    node->children[0] = newnode;
    newnode = allocnode();
    newnode->parent = node;
    node->children[1] = newnode;

    splitfaces(node->planenum);

    node->children[0] = bspgen(node->children[0], children[0]);
    node->children[1] = bspgen(node->children[1], children[1]);

    return node;
}

```

Much of the code is quite akin to that of the BSP tool in the idTech 2 lineage. 

<code>greedyselect</code> and <code>splitfaces</code> are sophisticated functions, both of which make use of code to classify polygons against the plane that splits them. I originally coded <code>greedyselect</code> as a single heuristic which selects the face which causes the least amount of splits in a node. However, this "pivot selection" does not need to be limited to a single heuristic. It can use a more complex combination of heuristics.

The idTech 2 BSP generation makes use of free functions to free polygonal windings on "brushes". I believe it was because it was ideal for the developers to always provide an option to free redundant memory, and built their structures in a way to support that. There is a line, of which I commented on: 

```c
    node->planenum = pivot->planenum & ~1;  // From Quake II. It's a bit less trivial in Scratch
```
In Quake, it's used along with their functions to free brush geometry in order to implicity remove bad geometry which could otherwise produce faulty trees(specifically faces which protrude into otherwise solid regions). They built all of the geometry from basic convex polytopes called "brushes", and they use CSG to add and subtract these brushes from one anther. Seeing the way the developers built the tree generation code, I imagine it uses their CSG methods. I didn't do this in my own code because, at the time, I was unaware of how quake went about BSP. Instead, my program relied on an already CSG'ed lazy mesh, and assumed an absence of bad geometry such as leaks or t-junctions, then built the tree on this assumption. That way, the inclusion of this operator and freeing functions is not actually necessary. However, I included the line with the operator because I found the functionality of it very worth mentioning.

I'm not entirely sure if I'd want to end up just using Quake's brush BSP as opposed to what I have right now, but the switch is quite possible it seems. 