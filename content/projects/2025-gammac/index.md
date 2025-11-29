+++
title = "GAMMAC" 
description = "A Quake-style 3D engine, meant to be the successor of my original 3D BSP engine, coded in C/C++."
date = 2025-11-28
[extra]
start_date = "1 Jan 2025"
end_date = "CURRENT"
status = "IN PROGRESS"
+++

<h1 class="article-title">GAMMAC</h1>

<hr class="type1">
<div class="textbox">
    <b>A Quake-style 3D game engine, of which I am writing the following for:</b>
    <li>Custom BSP utilities ("BSP", "VIS", and "RAD")</li>
    <li>Quake BSP file reader</li>
    <li>Vulkan-based renderer</li>
    <li>BSP binary to Scratch-readable ascii converter</li>
</div>

<h1 class="article-title">Wait (Where are we Now?)</h1>

When I was originally working with BSP-based rendering, I mostly looked into high-level descriptions and written algorithms across various collision detection books, real-time rendering blogs, forums, etc... As I was beginning to expose myself to existing game software and documentation, I was quickly drawn to the old-style Quake engines. I quickly realized that the renderer that I once thought was powerful, and perhaps even personally groundbreaking, was incomprehensibly dwarfed by the 1991 "Quake". I first touched ground on the Quake software through Michael Abrash's "[Graphics Programming Black Book](https://www.jagregory.com/abrash-black-book/)".

At the time, my engine utilized [a basic "canonical" node-storing BSP](https://dl.acm.org/doi/pdf/10.1145/965105.807481/), however, the issue of robust collision detection was rather difficult due to the engine's inability to effectively describe solid regions. Although described in a brief few paragraphs, Abrash took note of a specialized "solid-leaf BSP" used by Quake's software renderer. 

<h1 class="article-title">It All Goes Back to 1991</h1>

The solid-leaf structure essentially pushes all polygons into convex leaves, via a recursive binary space partitioning routine. Quake's game geometry is composed entirely of the constructive solid geometry of convex "brushes". Each brush has an explicit "solid" region(described as a leaf), as well as "empty" regions. By applying boolean operations on these brushes, an "airtight" map is obtained. With such a map, a flood operation upon it will be contained in the finite empty space bounded by the solid geometry.

After this, a potentially visible set(PVS), is generated for each leaf. Where all potentially visible neighbors of a leaf are marked by a 1 bit, and certainly invisible leaves are marked with 0s. Upon finding the leaf in which the viewer resides in, the PVS for the given leaf is used to mark potentially visible leaves. 

When rendering the world, a recursive inorder walk of the tree is done to retrieve the leaves in correct drawing order. Leaves are ignored if they failed to be marked by the PVS, if their minimum bounding box is not within the view frustum, or if they are solid (solid leaves do not have any faces to render). The faces within these leaves are then drawn on-screen in the provided order to create a frame of the world. 

The series of prunings(PVS, frustum culling, backface culling) effectively reduce the number of faces which are finally considered for drawing, often by great numbers. These are pushed into an active edge list(AEL), where further optimizations are performed in order to eliminate overdraw on the software renderer.

<h1 class="article-title">FAST FORWARD</h1>

I started working on GammaC, the C++ sucessor to [Gamma Engine](https://yumagia.dev/projects/2022-gammaengine/). The original Gamma Engine would generate a solid-leaf tree from a "lazy mesh", and in many ways, worked a lot like Quake. I wanted to produce a faster, more powerful version of Gamma Engine that would still remain faithful to the original. Firstly, I wanted to store the entire game level information in a single file, like how Quake has the .bsp format. 

Reading into Quake's binary space partitioning tool and .bsp format, there were some design choices which were initially somewhat unclear to me. I noticed that Quake's polygons "resided" on both internal nodes, and leavess. I always assumed that they'd be purely within the leaves, like how a solid-leaf tree would supposed to. Searching on the web did not help much further, either. Some sources briefly noted that the node faces were used for collision, and the leaf faces were used in rendering. It wasn't actually until I asked ericw, who made [ericw-tools for Quake](https://ericwa.github.io/ericw-tools/), as to what was going on. Apparently, the process of making a leafy tree produces far more splits than making a node-storing tree. I realized this early into my development of the original Gamma Engine. QBSP happens to push its faces onto both nodes and leaves, and will leave some faces unsplit to be referenced by up to two leaves. This greatly reduces splits by allowing leafs to share polygons instead of splitting them. The partitioning works much like a node-storing BSP algorithm. It just happens that leaves are produced too. Knowing this, I immediately implemented the hybrid method to GammaC, and it nicely worked out to reduce the number of splits that my original engine would produce.