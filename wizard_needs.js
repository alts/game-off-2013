var jerk = require('jerk.js'),
    scenes = [
      require('title_scene.js')
    ];

jerk.registerScenes(scenes);
jerk.begin(document.getElementById('canvas'), scenes[0]);