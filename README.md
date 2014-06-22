Sketcher
========

Introduction
------------

This code is designed to allow you add a sketch area in your mobile application.

To do that, I have used HTML5, CSS3, Javascript (pure and jQuery framework) to create the
user interface and the internal business logic.

This web code has to be wrapped and compiled so, I have used the Apache Phonegap framework
(version 3.5.0) and I have created the Android platform intall package.

System requirements
-------------------

* Node.js (v0.10.28 or later).
* Phonegap (v3.5.0-0.20.4 or later).
* Android SDK (v2.3.3 API10 or later).
* Text editor or IDE (I am using Netbeans 8).

Warnings
--------

If you are gonna use this code to add a sketch into a web browser, remember to change
the touch events used into the **sketch.js** file by the mouse events before to deploy it.

How it works?
-------------

### Drawing sketches

To draw lines into the sketch which are able to follow your finger is just the join of
a lot of very small lines one by one.

The start point is obtained when the user touch the screen through the **touchstart** event. 
At this moment, we take the canvas screen coordinates where the user has touched.

When the user begins to move their finger, we detect the **touchmove** event and we take the
new finger coordinates again so, we draw into the canvas a very small line between the first
coordinates and the new ones. After that, we store the current coordinates for the next
touchmove event.

If the user has finished to draw and lift their finger from the screen, we detect the
**touchstop** event and reset the stored coordinates.

This way you can to paint any draw that you want.

### Changing the pencil color

Obviously, to paint just in black is a little bit boring so, when the pencil tool is selected,
the user can choose between a limited color palette.

When the user click on some color, we detect the **click** event and we change the canvas
context style to the selected color and we store that choose.

### Deleting draws

To delete a specific section of a line is a little bit complex in the canvas object so,
in this code I have implemented a not very elegant solution. I am gonna use Tipp-Ex.

This way, if I want to delete a specific area into the canvas, I just change the pencil color
to white and define the end of the segments as square.

To define the width of my Tipp-Ex pencil, I have implemented a range type imput to change it.

Directory Structure
-------------------

### index.html file

This file contains the HTML structure which is based the user interface.

This structure is composed by a "sketch menu" where I have placed the basic tools to
operate with the sketch.

Under the sketch menu is placed the canvas which is the real sketch area.

These both elements are wrapped by a DIV tag which use all available screen area.

Finally, at the end of the code, I have included the Javascript libraries and files
with the code used to control all operations.

### sketcher.apk file

This is the instalation file for Android OS.

### css folder

This folder contains two files which manage all user interface look.

The **index.css** file manage the BODY tag graphic behavior and the **sketch.css** file
contains all style rules used to manage the sketch area appearance.

### img folder

This folder contains the icons used by the sketcher tools.

### js folder

In this folder we find the jQuery library used in the project and the **sketcher.js** file,
which contains all functions used to create the sketches.