+++
title = "GAMMA ENGINE (SCRATCH)" 
description = "Inspired by the id Tech 2 (Quake) engine, built in the Scratch language from the ground-up."
date = 2024-12-22
[extra]
start_date = "31 OCT 2022"
end_date = "01 JAN 2025"
status = "COMPLETE"
icon = "/projects/2022-gammaengine/2024-10-05.png"
+++

<div class="bannervw" style="background-image: url('2024-10-05.png');"></div>
<h1 class="article-title">GAMMA ENGINE</h1>

<hr class="type1">
<div class="textbox">
    <b>An engine inspired by id Tech 2 (Quake), which I programmed entirely from the ground-up. Here are some of the following which I wrote for it:</b>
    <li>Tool which converts lazy meshes of .OBJ format into solid-leaf BSP trees</li>
    <li>Another which bakes map lighting by pathtracing on the solid-leaf trees</li>
    <li>Traversal, search, and insertion functions</li>
    <li>Player movement and collision engine</li>
    <li>Various trace and collision functions</li>
    <li>Quaternion, as well as matrix-based vector transformation libraries</li>
    <li>3D dynamic sound engine</li>
    <li>Dynamic solid models</li>
    <li>Particle engine</li>
    <li>Real-time lighting engine</li>
</div>

<div class="captionedfigure">
    <div class="figure3">
        <img src ="2025-01-10 144101.png"/>
    </div>
    <span>
        <b>A map I made for the engine called "blockout". Shadows can be preprocessed and rendered as overlaid polygons.</b>
    </span>
</div>

I've been working on this one for a while now. It's a 3D game engine inspired by the id Tech 2 (Quake) engine. I built it in the year 2022. Like all my engines from around then, it was built in the Scratch language from the ground-up. It includes a tool which converts lazy meshes in .OBJ format into solid-leaf BSP trees, and another, which subsequently bakes map lighting by pathtracing on the generated BSP trees. Core functions of the engine include various trace functions against the BSP tree, as well as traversal, search, and insertion. It allows for features such as Quake-style player movement, projectiles that bounce, and a mesh of an enemy which occludes properly against the game map. These features are built in their own respective engines: The movement engine, entity updates engine, and the rendering engine.

It uses a 3D dynamic sound engine I wrote for a previous project to produce directional audio. Transformations are either done using some simple matrix operations, or through a handful of quaternion functions, and I get to choose between the two when I need to code a transformation. Currently, triangles are filled using a "fast triangle fill", which uses Scratch's pen tool to fill a triangle in as little strokes and calculation as possible. The sound engine, quaternion functions, and triangle filler were written previous to the development of this project, and for previous projects.


<span class="line-break"></span>

<div class="bannervw" style="background-image: url('etherealplane.png');"></div>
<h1 class="article-title">ALPHA, BETA, AND GAMMA</h1>

Gamma Engine started as a vision to create a 3D engine suitable for creating fun first person shooter type games on Scratch. It had to have rich functionality like never seen before. Within a few months of on-and-off programming, I had something working. It had a wireframe neon guy who could blast bullets in first person. I also wrote a sound module which allowed for sounds to play directionally for the player. The sound would fall-off at a distance. This was what I now call "Alpha Engine".

<div class="captionedfigure">
    <div class="figure3">
        <img src ="Screenshot 2023-12-31 132923.png"/>
        <img src ="Screenshot 2025-02-28 181424.png"/>
        <img src ="Screenshot 2025-02-28 181957.png"/>
    </div>
    <span>
        <b>During winter break of 2020, my friends and I tested and played the engine in its current state.</b>
    </span>
</div>


Although it was quite a personal success, it was hard to use and ran extremely slow. I kept updating and building this engine until 2022. By then, it reached its own limits. As per my learning process, I wanted to conquer one of the three at a time: Functionality, user-friendliness, and optimization. Immediately after stopping development on the project, I wanted to make a more user-friendly engine... and I made Beta Engine.

<div class="captionedfigure">
    <div class="figure3">
        <img src ="Screenshot 2025-07-07 100631.png"/>
    </div>
    <span>
        <b>One of the many experiments I did with BETA.</b>
    </span>
</div>

It was the COVID-19 pandemic. I would frequently scrolling and conversing in online circles, both on Scratch and not not on Scratch, with other users who coded technical Scratch-based programs. Users I knew of would occasionally bring up this algorithm, purported to have to ability to eliminate all rendering artifacts otherwise encountered by the common-use "painter's algo": Binary Space Partitioning.

I knew nothing about it, but after thinking a bit, I was able to reverse-engineer an algorithm from conceptual-level description. The new algorithm would take an array of polygons in 3D camera space (stored as pointers to polygon objects), and used Lomuto's Partitioning Scheme to sort them. The partition pivots were defined as the planes in which a polygon layed upon. All other polygons within the given set would be partitioned by whether they lay within the front of, or behind, the partitioning plane. Polygons existing within both half-spaces were split along the plane and their fragments were inserted in each of their respective half-spaces. The front of the partitioning plane would be dictated by which half-space the viewing camera was located. The sort would be recursed upon the two half spaces until there no longer existed unused pivot polygons. 

The implementation was initially buggy due to my limited understanding of how computer scientists would approach such a problem. In fact, I remember using strings of ones and zeros to feed into a helper function in order to drive the algorithm. It was not an ideal method. I later ran into a sole existing implementation of exactly what I wanted to implement. That implementation which I ended up basing my algorithm off of was much closer to the essence of Lomuto's Partitioning Scheme, which is employed as a common quicksort algorithm. 

As the year turned to 2020, I had a nicely working engine which, in every given frame, could be fed a polygon soup. It would in turn properly sort all of the geometry, splitting any offending polygons, and return an artifact-free image of the scene. I quickly figured that with the clipping and chopping helper functions I wrote which could take any arbitrary plane and chop a scene, I could create interesting effects which involved subtractions against the world geometry.

Some things that I tried making were visual "portals", magnifying lenses, x-ray lenses, and hologram lenses.

<div class="captionedfigure">
    <div class="figure3">
        <img src ="Screenshot 2025-07-10 200155.png"/>
    </div>
    <span>
        <b>A hologram sight I made for the engine demo project.</b>
    </span>
</div>

<div class="captionedfigure">
    <div class="figure3">
        <img src ="Screenshot 2025-07-10 200522.png"/>
    </div>
    <span>
        <b>An example of what I would call the "x-ray effect".</b>
    </span>
</div>

<div class="bannervw" style="background-image: url('2024-09-09.png');"></div>
<h1 class="article-title">GAMMA: ENGINE OF LIGHT</h1>

I wanted functionality and I wanted user-friendliness. And I felt I achieved them. Now I wanted optimization. So I sought for it.

<div class="bannervw" style="background-image: url('2024-10-05.png');"></div>
<div class="bannervw" style="background-image: url('etherealplane.png');"></div>
<div class="bannervw" style="background-image: url('2024-09-09.png');"></div>
<h1 class="article-title">GAMMA-C</h1>

Current tasks include: Addressing collision issues involving solid models in movement, replacing baked pathtracing with a radiosity algorithm.

Future tasks may include: Finishing the potentially visible set(PVS) generation algorithm and adding its associated functions, rewriting the engine and utilities in C/C++, adding textures.

{{ gallery() }}