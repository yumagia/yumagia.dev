+++
title = "3D SOUND ENGINE" 
description = "An engine written in Scratch to link 3D coordinates with audio, giving the two an immersive presence. It adjusts pan and volume according to the camera transformations."
date = 2020-01-01
[extra]
start_date = "OCT 2020"
end_date = "NOV 2020"
status = "COMPLETE"
+++

Scratchers have used distance fall-off on audio to give certain sound effects a convincing presence in 3D space. This has been done as early as 2016. But early into making my first 3D game engine, I was wondering why nobody had yet used the audio pan effect offered by Scratch 3.0(which was newly released at the time) for purposes of 3D sound. Seeing as this was something not yet done, I set off to work.

First, I wanted to try deriving a 2D vector formula, then extend it to 3D later. In the 2D problem, there are four vectors involved: <span class="mathfig"><b><i>n</i></b></span>, <span class="mathfig"><b><i>l</i></b></span>, <span class="mathfig"><b><i>r</i></b></span>, and <span class="mathfig"><b><i>c</i></b></span>.

The outputs are a stereo pan value(which ranges between -100 and 100, with -100 being entirely in the left channel and 100 being entirely in the right), and a volume value(from 0 to 100, with 100 being the percentage of the sample volume).

<!-- The dynamic volume is simply calculated by the inverse square law, where distance is <span class="mathfig"><b><i>c</i></b></span>. The formula in terms of <span class="mathfig"><b><i>c</i></b></span> is given below:

<div class="mathfig">
    <p>|<b><i>c</i></b>|<sup>2</sup></p>
    <hr>
    <p>|<b><i>c</i></b>|<sup>2</sup></p>
</div> -->



<div class="captionedfigure">
    <div class="figure">
        <img src ="notebookforumla1.jpg"/>
        <img src ="notebookforumla2.jpg"/>
    </div>
    <span>
        <b>The above figures are my derivations of the 2D formula, written with the help of my dad.</b>
    </span>
</div>

{{ gallery() }}