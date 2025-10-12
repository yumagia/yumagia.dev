+++
title = "CSCI 5607 PROJECT 2" 
description = "An image processing library written in C++."
date = 2025-10-12
[extra]
start_date = "6 OCT 2025"
end_date = "12 OCT 2025"
status = "COMPLETE"
icon = "/projects/2025-csci5607-project2/Screenshot 2025-10-12 183201.png"
+++

<div class="bannervw" style="background-image: url('Screenshot 2025-10-12 183201.png');"></div>

<h1 class="article-title">CSCI 5607 PROJECT 2</h1>

This was an image processing library I made for the second project of my Fundamentals of Computer Graphics 1 class. It takes image files(.bmp, .jpg/.jpeg, .png, .tga), and reads them using [the stb image, and stb image writing libraries](https://github.com/nothings/stb). It applies image processing filters on them, and writes them to output images. 

Here is an image of a rubiks cube provided by our instructor:

<div class="captionedfigure">
    <div class="figure3">
        <img src ="cube.jpg"/>
    </div>
    <span>
        <b>A rubiks cube</b>
    </span>
</div>

<span class="line-break"></span>

<div class="bannervw" style="background-image: url('cube-cropped.jpg');"></div>
<h1 class="article-title">BASIC EFFECTS</h1>

These are some of the rather basic effects. Brightness is done by scaling each pixel by a brightness factor. Extracting a channel is as simple as iterating through the pixels, and removing the other channels, while keeping a given channel. Cropping involves making a copy of the image with given crop dimensions, and transferring over the pixels in the frame. Quantization limits the palette of each pixel to a given bit depth.

<div class="captionedfigure">
    <div class="figure">
        <img src ="cube-bright.jpg"/>
        <img src ="cube-dark.jpg"/>
    </div>
    <span>
        <b>With a brightness of 1.5 and brightness of 0.5</b>
    </span>
</div>

You can also extract the three color channels:

<div class="captionedfigure">
    <div class="figure">
        <img src ="cube-red.jpg"/>
        <img src ="cube-green.jpg"/>
        <img src ="cube-blue.jpg"/>
    </div>
    <span>
        <b>The red, green, and blue channels have been extracted</b>
    </span>
</div>

Here it is, cropped:

<div class="captionedfigure">
    <div class="figure3">
        <img src ="cube-cropped.jpg"/>
    </div>
    <span>
        <b>The image, cropped</b>
    </span>
</div>

Here are some various quantized versions of the image:

<div class="captionedfigure">
    <div class="figure">
        <img src ="cube-quantize4.jpg"/>
        <img src ="cube-quantize2.jpg"/>
        <img src ="cube-quantize1.jpg"/>
    </div>
    <span>
        <b>Quantized to 4, 2, and 1 bit coloring on each channel</b>
    </span>
</div>

These were the associated commands for generating the images:

<code>
./image -input samples/cube.jpg -brightness 1.5 -output output/cube-bright.jpg

./image -input samples/cube.jpg -brightness 0.5 -output output/cube-dark.jpg

./image -input samples/cube.jpg -extractChannel 0 -output output/cube-red.jpg

./image -input samples/cube.jpg -extractChannel 1 -output output/cube-green.jpg

./image -input samples/cube.jpg -extractChannel 2 -output output/cube-blue.jpg

./image -input samples/cube.jpg -crop 200 200 256 256 -output output/cube-cropped.jpg

./image -input samples/cube.jpg -quantize 4 -output output/cube-quantize4.jpg

./image -input samples/cube.jpg -quantize 2 -output output/cube-quantize2.jpg

./image -input samples/cube.jpg -quantize 1 -output output/cube-quantize1.jpg
</code>

<span class="line-break"></span>

<div class="bannervw" style="background-image: url('cube-contrast-negative.jpg');"></div>
<h1 class="article-title">NOISE, CONTRAST, AND SATURATION</h1>

These effects will employ interpolation/extrapolation between the source image and some modifiers. Noise, for example, lerps between the source image a a purely randomized image. Contrast lerps between the source image and a pixel which stores the average luminance. Saturation is similar, but uses a grayscale image instead of a uniformly gray image. 

<div class="captionedfigure">
    <div class="figure">
        <img src ="cube-noisy1.jpg"/>
        <img src ="cube-noisy2.jpg"/>
        <img src ="cube-noisy3.jpg"/>
    </div>
    <span>
        <b>I implemented noise by interpolating the image with randomized pixels.</b>
    </span>
</div>

<div class="captionedfigure">
    <div class="figure3">
        <img src ="cube-noisy-negative.jpg"/>
    </div>
    <span>
        <b>You can even interpolate in the negative direction. This subtracts noise from the image</b>
    </span>
</div>

<div class="captionedfigure">
    <div class="figure">
        <img src ="cube-contrast.jpg"/>
        <img src ="cube-contrast-low.jpg"/>
        <img src ="cube-contrast-negative.jpg"/>
    </div>
    <span>
        <b>High, low, and negative contrast</b>
    </span>
</div>

<div class="captionedfigure">
    <div class="figure">
        <img src ="cube-saturation-high.jpg"/>
        <img src ="cube-grayscale.jpg"/>
        <img src ="cube-saturation-negative.jpg"/>
    </div>
    <span>
        <b>Double, zero, and negative saturation. Zero saturation is simply grayscale, and negative saturation is like negative contrast in that it inverts the hues, but it does not invert the brightness.</b>
    </span>
</div>

These were the commands used to generate the images

<code>
./image -input samples/cube.jpg -noise 0.1 -output output/cube-noisy1.jpg

./image -input samples/cube.jpg -noise 0.25 -output output/cube-noisy2.jpg

./image -input samples/cube.jpg -noise 0.75 -output output/cube-noisy3.jpg

./image -input samples/cube.jpg -noise -1 -output output/cube-noisy-negative.jpg

./image -input samples/cube.jpg -contrast 2 -output output/cube-contrast.jpg

./image -input samples/cube.jpg -contrast 0.5 -output output/cube-contrast-low.jpg

./image -input samples/cube.jpg -contrast -1 -output output/cube-contrast-negative.jpg
</code>

<div class="bannervw" style="background-image: url('cube-sobel.jpg');"></div>
<h1 class="article-title">THE KERNEL</h1>

These filters make use of "kernels" (also known as "masks"), in order to apply effects which require insight on some sort of adjacency between pixel values.

<div class="captionedfigure">
    <div class="figure">
        <img src ="cube-sharpened.jpg"/>
        <img src ="cube-blurred.jpg"/>
    </div>
    <span>
        <b>Sharpen and blur</b>
    </span>
</div>

<div class="captionedfigure">
    <div class="figure3">
        <img src ="cube-sobel.jpg"/>
    </div>
    <span>
        <b>Edge detection with Sobel operator</b>
    </span>
</div>

<div class="captionedfigure">
    <div class="figure">
        <img src ="cube-random-dither1.jpg"/>
        <img src ="cube-random-dither2.jpg"/>
        <img src ="cube-random-dither3.jpg"/>
    </div>
    <span>
        <b>Random dither with three levels of quantization</b>
    </span>
</div>

<div class="captionedfigure">
    <div class="figure">
        <img src ="cube-fs1.jpg"/>
        <img src ="cube-fs2.jpg"/>
        <img src ="cube-fs3.jpg"/>
    </div>
    <span>
        <b>Floyd-Steinberg dither with three levels of quantization</b>
    </span>
</div>

Here are the following commands to generate the above images:

<code>
./image -input samples/cube.jpg -sharpen 15 -output  output/cube-sharpened.jpg

./image -input samples/cube.jpg -blur 15 -output  output/cube-blurred.jpg

./image -input samples/cube.jpg -edgeDetect -output  output/cube-sobel.jpg

./image -input samples/cube.jpg -randomDither 4 -output  output/cube-random-dither1.jpg

./image -input samples/cube.jpg -randomDither 2 -output  output/cube-random-dither2.jpg

./image -input samples/cube.jpg -randomDither 1 -output  output/cube-random-dither3.jpg

./image -input samples/cube.jpg -FloydSteinbergDither 4 -output  output/cube-fs1.jpg

./image -input samples/cube.jpg -FloydSteinbergDither 2 -output  output/cube-fs2.jpg

./image -input samples/cube.jpg -FloydSteinbergDither 1 -output  output/cube-fs3.jpg
</code>

<div class="bannervw" style="background-image: url('cube-sobel.jpg');"></div>
<h1 class="article-title">SAMPLING</h1>

When you scale and rotate an image, you'll have to resample it. My implementation provides the following methods: point sampling, bilinear sampling, and gaussian sampling. Each gets progressively nicer, but gaussian sampling tends to be particularly slow. 

<div class="captionedfigure">
    <div class="figure">
        <img src ="cube-rotated.jpg"/>
    </div>
    <span>
        <b>Rotated by 35 degrees</b>
    </span>
</div>

<div class="captionedfigure">
    <div class="figure">
        <img src ="cube-shrunk.jpg"/>
        <img src ="cube-shrunk-gaussian.jpg"/>
    </div>
    <span>
        <b>Both of these images are shrunken to the same factor. But they aren't the same. Can you tell the difference?</b>
    </span>
</div>

<div class="captionedfigure">
    <div class="figure">
        <img src ="cube-shrunk-cropped.jpg"/>
        <img src ="cube-shrunk-gaussian-cropped.jpg"/>
    </div>
    <span>
        <b>How about now? </b>
    </span>
</div>

Maybe still not. 

The first image uses point sampling, whereas the other uses gaussian sampling against an 11 by 11 grid of each pixel's neighbors. As you can see, nearest neighbor produces some aliasing jaggies. It's honestly not totally noticable in this example, but in certain upscaling and downscaling operations, especially when the image has higher spatial frequencies, aliasing effects can become extremely noticable. Let's look at a better example! I'll use a different image this time, and upscale a portion of it by a factor of five.

<div class="captionedfigure">
    <div class="figure">
        <img src ="garden_gods_sampling_0.jpg"/>
        <img src ="garden_gods_sampling_1.jpg"/>
        <img src ="garden_gods_sampling_2.jpg"/>
    </div>
    <span>
        <b>How about now? </b>
    </span>
</div>

In order, the sampling methods are point, bilinear, and gaussian. As you can see, bilinear really helps clear up some jaggies, and gaussian is the smoothest of all of them.

The code for the images in this section:

<code>
./image -input samples/cube.jpg -sampling 2 -rotate 35 -output  output/cube-rotated.jpg

./image -input samples/cube.jpg -sampling 0 -scale 0.5 0.5 -output  output/cube-shrunk.jpg

./image -input samples/cube.jpg -sampling 2 -scale 0.5 0.5 -output  output/cube-shrunk-gaussian
.jpg

./image -input samples/cube.jpg -sampling 0 -scale 0.5 0.5 -crop 170 120 50 50 -output  output/
cube-shrunk-cropped.jpg

./image -input samples/cube.jpg -sampling 2 -scale 0.5 0.5 -crop 170 120 50 50 -output  output/cube-shrunk-gaussian-cropped.jpg

./image -input samples/garden_gods.jpg -crop 450 450 50 50 -sampling 0 -scale 5 5 -output  output/garden_gods_sampling_0.jpg

./image -input samples/garden_gods.jpg -crop 450 450 50 50 -sampling 1 -scale 5 5 -output  output/garden_gods_sampling_1.jpg

./image -input samples/garden_gods.jpg -crop 450 450 50 50 -sampling 2 -scale 5 5 -output  output/garden_gods_sampling_2.jpg
</code>

<div class="bannervw" style="background-image: url('cube-random-dither3.jpg');"></div>
<h1 class="article-title">TWEAKING</h1>

Many of these filters are nicely straightforward and are nicely defined. Others required intense tweaking. There were trade-offs for how large of a neighborhood I wanted to sample with gaussian sampling in order to get accuracy, vs a lot of speed. Although not exactly an issue of ambiguity or trade-offs, I also implemented edge detection and thought it was so unsatisfying that I rewrote it to use the Sobel operator. The biggest difficulty was the amount of tweaking I had to do in order to get the noise dithering to produce accurate brightness values. I not only logged luminance values and compared them, but I even looked and squinted between the randomly dithered image and the original in order to catch any visible change in brightness. A close contender was actually the Floyd-Steinberg filter which proved to be difficult to debug. At some point, I was convinced, incorrectly, that my code was working as intended. I compared the dithering pattern to [the one seen on Wikipedia](https://en.wikipedia.org/wiki/Floyd%E2%80%93Steinberg_dithering). It was likely the same pattern, but the colors were completely off. I believe at some point, I might have flipped a few arithmetic signs, and it ended up working. I do not know, however, because I forgot the minor tweak I did to my faulty code in order to fix it. This was the last thing I had left myself to code, and I was so happy to start writing my report on this project after finishing it.

<h2>INSTRUCTIONS:</h2>
<div class="textbox">
<b>The project is made to compile on linux, and the provided executable is for linux. 

Just run make to compile the project:

<code>make</code>

It's as simple as that!

You can try out any of the commands given on this page. Additionally, enter the command

<code>./image -help</code>

In order to view the available commands.
</b>


</div>

Here is a zip for the project source, as well as an executable of the program:
<div class="textbox">
<b><a href="CSCI-5607-Project-2-main.zip">SOURCE ZIP</a></b>

<b><a href="image.zip">PROGRAM EXECUTABLE (Stored in a zip)</a></b>
</div>

{{ gallery() }}