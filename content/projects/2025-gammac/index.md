+++
title = "GAMMAC" 
description = "A Quake-style 3D engine, meant to be the successor of my original 3D BSP engine, coded in C/C++."
date = 2025-09-30
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

The solid-leaf structure essentially pushes all polygons into convex leafs, via a recursive binary space partitioning routine. Quake's game geometry is composed entirely of the constructive solid geometry of convex "brushes". Each brush has an explicit "solid" region(described as a leaf), as well as "empty" regions. By applying boolean operations on these brushes, an "airtight" map is obtained. With such a map, a flood operation upon it will be contained in the finite empty space bounded by the solid geometry.

After this, a potentially visible set(PVS), is generated for each leaf. Where all potentially visible neighbors of a leaf are marked by a 1 bit, and certainly invisible leafs are marked with 0s. 



TO BE CONTINUED!