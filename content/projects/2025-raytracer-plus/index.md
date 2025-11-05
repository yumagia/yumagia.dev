+++
title = "RAYTRACER+" 
description = "A raytracer writen in C++."
date = 2025-11-01
[extra]
start_date = "31 OCT 2025"
end_date = "1 NOV 2025"
status = "COMPLETE"
icon = "/projects/2025-sphere-raytracer/spheres2.png"
+++

<div class="bannervw" style="background-image: url('spheres2.png');"></div>

<h1 class="article-title">RAYTRACER+</h1>

I previously made a sphere raytracer that featured things like dielectrics(reflection and refraction), shadows, and phong shading. The next part of the project builds off of this by adding triangles, vertex normals, and acceleration structures.

<div class="captionedfigure">
    <div class="figure3">
        <img src ="spheres2.png"/>
    </div>
    <span>
        <b>This project expands off of the sphere raytracer.</b>
    </span>
</div>



<div class="bannervw" style="background-image: url('planefail.png');"></div>

<h1 class="article-title">THE BVH</h1>

I must admit. The Stanford dragon was so slow that I genuinely implemented a BVH before it could finish.

I initially wrote it with each node containing a vector of triangles and pointers to its children. Upon seeing [this blog](https://jacco.ompf2.com/2022/04/13/how-to-build-a-bvh-part-1-basics/), and reading through a brief mention of such a struct having issues, I was rather afraid that the BVH was going to cause some problems and a disappointing overhead. Unwieldy structs were also an apparent phenomenon to me in my adventures implementing BSP trees. So I went about, changing all BVH nodes to utilize 

I terminated the program at three hours and started testing the BVH. I was initially very scared because the provided test scene with two triangles was slowed an additional ten seconds from an already concerning 25 seconds it took to render. It felt like an unacceptable overhead. Even after a couple of optimization attempts to further reduce cache misses, it was still much slower. However, to my pleasant surprise, I ran the dragon file for the second time, and it was progressing slowly, but still reasonably.

<div class="captionedfigure">
    <div class="figure3">
        <img src ="dragonfail.png"/>
    </div>
    <span>
        <b>Disaster struck.</b>
    </span>
</div>

This was beyond disappointing. I waited 667.907 seconds for this to happen. I tweaked my BVH code a bit and ran it again. In the meantime, I tried cutting down more unwieldy structs. Maybe the standard vector library was a no-go? I replaced some of those as the dragon approached its completion.

<div class="captionedfigure">
    <div class="figure3">
        <img src ="dragonfailagain.png"/>
    </div>
    <span>
        <b>1282.69 seconds later...</b>
    </span>
</div>

<div class="bannervw" style="background-image: url('planefail.png');"></div>

<h1 class="article-title">ISSUES I SPENT HOURS FIXING</h1>

It all comes crashing down. The BVH was not properly accelerating the scene even when I knew for sure it was implemented properly. The smallest scenes took at least half a minute to load. Although the sphere-only scenes were perfect, any scene with even a single triangle was failing to render properly. Even stranger yet, upon running the scene a few times, some of the renders would look almost accurate, and some would quite look far off. I was perplexed because I didn't expect such non-deterministic behavior to occur with this C++ program with the -fsanitize=adress flag... but there was no time to be perplexed. This project was already a day late. 

<div class="captionedfigure">
    <div class="figure">
        <img src ="optimizeartifact.png"/>
        <img src ="dissimilar.png"/>
    </div>
    <span>
        <b>Spurious renders of the same executable that would have a possibility of appearing when running the program</b>
    </span>
</div>

<div class="captionedfigure">
    <div class="figure">
        <img src ="outdoorbugged1.png"/>
        <img src ="outdoorbugged2.png"/>
        <img src ="outdoorbugged3.png"/>
    </div>
    <span>
        <b>The same phenomenon, but on a different file</b>
    </span>
</div>

The next morning I woke up and started testing and debugging... and soon enough in the afternoon, it all came together.

<div class="bannervw" style="background-image: url('dragon.png');"></div>

<h1 class="article-title">BREAKTHROUGH</h1>

The first major issue I noticed was the fact that I was performing copy assignments on the entire triangle and sphere lists at every ray cast. This is intuitively very bad, and likely explains why the parallel processing was incredibly slow. I removed these operations and ran it again. Immediately, the basic scenes with only a handful of objects ran in a few seconds. They sped up even more when I enabled multithreading.

Strangely, the bug where the output would be different every time the raytracer ran persisted. During class, I was able to hone the issue down to the surface normal returned by a triangle hit. It needed to be flipped towards the origin of the ray such that it would always face in that direction. This code would only sometimes work in certain runtimes. I was perplexed, but I had to go home to eat dinner.

I scoured my code a bit more when it struck me: My plane distances("d" in the general form of the plane) were wrong. I checked the code which created planes for each triangle and sure enough, I didn't even initialize this component. The raytracer was reading off of uninitialized floats the entire time. After fixing that, the scenes looked much closer to how they should have.


<div class="captionedfigure">
    <div class="figure">
        <img src ="outdooralmost.png"/>
        <img src ="dragonalmost.png"/>
        <img src ="dragonalmost2.png"/>
    </div>
    <span>
        <b>The scenes were no longer inconsistent, and they were looking a lot less bugged.</b>
    </span>
</div>

After changing a few epsilons, I made a breakthrough! The dragon was rendering properly, and so were the basic triangle-containing scenes.

<div class="captionedfigure">
    <div class="figure3">
        <img src ="dragon.png"/>
    </div>
    <span>
        <b>Breakthrough!</b>
    </span>
</div>

<div class="bannervw" style="background-image: url('planefail.png');"></div>

<h1 class="article-title">OPTIMIZATION</h1>


<div class="captionedfigure">
    <span>
        <b>STANFORD DRAGON</b>
    </span>
    <div class="figure3">
        <img src ="dragon.png"/>
    </div>
</div>

<table>
    <tr>
        <th> </th>
        <th>No BVH</th>
        <th>BVH</th>
    </tr>
    <tr>
        <th>No Multithreading</th>
        <th>>1000s</th>
        <th></th>
    </tr>
        <tr>
        <th>12 threads</th>
        <th>~500s</th>
        <th>~300s*</th>
    </tr>
</table>



<div class="captionedfigure">
    <span>
        <b>PLANT</b>
    </span>
    <div class="figure3">
        <img src ="plant.png"/>
    </div>
</div>

<table>
    <tr>
        <th> </th>
        <th>No BVH</th>
        <th>BVH</th>
    </tr>
    <tr>
        <th>No Multithreading</th>
        <th>>1000s</th>
        <th></th>
    </tr>
        <tr>
        <th>12 threads</th>
        <th></th>
        <th>~520s</th>
    </tr>
</table>

<img src ="/img/halloween.png" width = "360"/>

{{ gallery() }}