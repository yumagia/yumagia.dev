+++
title = "GAMMA ENGINE" 
description = "Inspired by the id Tech 2 (Quake) engine, built in the Scratch language from the ground-up."
date = 2022-10-31
[extra]
start_date = "31 OCT 2022"
status = "CURRENT"
+++

I've been working on this one for a while now. It's a 3D game engine inspired by the id Tech 2 (Quake) engine. I built it in the year 2022. Like all my engines from around then, it was built in the Scratch language from the ground-up. It includes a tool which converts lazy meshes in .OBJ format into solid-leaf BSP trees, and another, which subsequently bakes map lighting by pathtracing on the generated BSP trees. Core functions of the engine include various trace functions against the BSP tree, as well as traversal, search, and insertion. It allows for features such as Quake-style player movement, projectiles that bounce, and a mesh of an enemy which occludes properly against the game map. These features are built in their own respective engines: The movement engine, entity updates engine, and the rendering engine.

It uses a 3D dynamic sound engine to produce directional audio. Transformations are either done using some simple matrix operations, or through a handful of quaternion functions, and I get to choose between the two when I need to code a transformation. Currently, triangles are filled using a "fast triangle fill", which uses Scratch's pen tool to fill a triangle in as little strokes and calculation as possible. The sound engine, quaternion functions, and triangle filler were written previous to the development of this project, and for previous projects.

Current tasks include: Addressing collision issues involving solid models in movement, replacing baked pathtracing with a radiosity algorithm.

Future tasks may include: Finishing the potentially visible set(PVS) generation algorithm and adding its associated functions, porting the code to C/C++, adding textures.

{{ gallery() }}