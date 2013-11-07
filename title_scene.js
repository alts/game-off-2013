(function() {
  var jerk     = require('jerk.js'),
      C        = require('constants.js'),
      progress = require('progress.js'),
      loader   = require('level_loader.js'),
      scene = Object.create(jerk.scene);

  scene.enter = function(prev) {
    this.reload();
    this.world = loader(0);
    console.log(this.world);
  };

  scene.reload = function() {
  };

  scene.draw = function() {
    var ctx = jerk.ctx;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, C.SCREEN_WIDTH, C.SCREEN_HEIGHT);

    this.world.draw();
  };

  scene.onkeyup = function(e) {
    var code = e.keyCode || e.charCode;
    if (code == C.K_UP) {
      this.world.move_char_up();
    } else if (code == C.K_DOWN) {
      this.world.move_char_down();
    } else if (code == C.K_LEFT) {
      this.world.move_char_left();
    } else if (code == C.K_RIGHT) {
      this.world.move_char_right();
    }
  };

  return scene;
})();