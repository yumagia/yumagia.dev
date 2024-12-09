+++
title = "BSP Code"
description = "A BSP tree generation function which I wrote for the Gamma Engine project, with pseudocode included."
[taxonomies]
tags=["scratchcode", "pseudocode"]
+++


Here is the BSP tree generation code for Gamma Engine. It creates a solid-leaf BSP tree, given a set of polygons from a lazy mesh. The pseudocode is provided below the Scratch function. 


<div class="figure2">
    <img src ="bspgeneratetreescratch.png"/>
</div>




<code>
function bsp_gen(lower, upper, side, parent)
    IF upper.next = lower THEN
        addnode(null, null, null, side, parent) //adds a solid leaf
        return
    greedyselectpivot(lower, upper)
    genboundinggeom(lower, upper)
    IF pivot = null THEN
        stabilizesort(lower, upper)
        IF not right? THEN
            addnode(null, null, null, side, parent)
            return
        add set to air leaf, inherit parent
        addnode(lower, upper, null, side, parent) //add air leaf
    ELSE
        partition(lower, upper)
        IF parent = null THEN
            addnode(partitionhead, pivot, &pivot, null, parent) //adds an internal node 
        ELSE
            addnode(partitionhead, pivot, &pivot, side, parent)
        bsp_gen(lower, pivot, left, *newnode)
        bsp_gen(lower.next, upper, right, *newnode)
</code>

Here's the function header for <code class="inline">addnode</code>:

<code>function addnode(lower, upper, splittingplane, side, parent)</code>

<!-- The function, <code class="inline">partition</code> -->