+++
title = "CSCI 5607 PROJECT 1" 
description = "A 3D game engine inspired by the id Tech 2 (Quake) engine, built in the Scratch language from the ground-up."
date = 2025-09-26
[extra]
start_date = "23 SEP 2025"
end_date = "26 SEP 2025"
status = "COMPLETE"
icon = "Screenshot 2025-09-26 194459.png"
+++

<div class="bannervw" style="background-image: url('Screenshot 2025-09-26 194459.png');"></div>

<h1 class="article-title">CSCI 5607 PROJECT 1</h1>

<hr class="type1">
<div class="textbox">
    <b>A 2D graphical application which utilizes PGA to manipulate a textured rectangle. Here are some of its features:</b>
    <li>A projective geometric algebra(PGA) library</li>
    <li>The ability to translate, rotate, and scale the texture with a mouse input</li>
    <li>And to increase or decrease brightness of the texture</li>
</div>

<h2>INSTRUCTIONS:</h2>
<div class="textbox">
<b>The project is made to compile on linux with SDL2. The provided executable is for linux. 

Use the following command to compile the project:

<code>g++ Square.cpp glad/glad.c -lSDL2 -lSDL2main -lGL -ldl -I/usr/include/SDL2/ -o square</code>

To move the square, click on its body, and drag it. Clicking and dragging on the corners will scale it. Drag on the edges to rotate. Up and down arrows will increase and decrease the texture brightness, respectively. Pressing "r" will reset the square. Pressing "f" will enable fullscreen.</b>
</div>

Implementing the transformations was relatively straightforward. We were previously assigned to implement many basic PGA multivector operations, which built up to the bulk of this project. Despite having all the basic operations for 2D geometric primitives, and also stuff like point-in-triangle collision, there were some interesting edge cases which I ran into while coding the transformations. One such case was the angle function used for rotation. The square would rotate properly in one direction, but in the opposing direction, a positive angle would be applied. This caused an inverted rotation across half of a full rotation. The solution was to simply draw a line from the clicked position and square's center, and find the signed distance from the dragged position to this line. The sign would be multiplied to the angle to produce a correct rotation. The rotation step caused an additional issue with zero-angles. Because the angle function was simply a line multiplied with another, the arc cosine would be not-a-number. I fixed this by simply evaluating for nan. 

Here is a zip for the project source, as well as an executable of the program:

The given texture is a grass block (side view) from Minecraft.

<div class="textbox">
<b><a href="CSCI-5607-Project-1-main.zip">SOURCE ZIP</a></b>

<b><a href="square.zip">PROGRAM EXECUTABLE (Stored in a zip)</a></b>
</div>

{{ gallery() }}