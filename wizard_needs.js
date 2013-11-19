var jerk = require('jerk.js'),
    // load images
    images = require('images.js'),
    scenes = [
      require('title_scene.js')
    ];

jerk.registerScenes(scenes);
jerk.begin(document.getElementById('canvas'), scenes[0]);