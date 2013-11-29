(function() {
  var jerk        = require('jerk.js'),
      C           = require('constants.js'),
      progress    = require('progress.js'),
      loader      = require('level_loader.js'),
      level_title = require('level_title.js'),
      submessage  = require('submessage.js'),
      scene = Object.create(jerk.scene);

  scene.enter = function(prev) {
    if (this.current_level == null) {
      this.current_level = 0;
    }
    this.reload();
  };

  scene.reload = function() {
    this.world = loader(this.current_level);
    this.level_title = level_title;
  };

  scene.draw = function() {
    var ctx = jerk.ctx;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, C.SCREEN_WIDTH, C.SCREEN_HEIGHT);

    this.world.draw();

    if (this.world.did_win) {
      this.level_title.draw('NEED SATISFIED');
    } else {
      this.level_title.draw(this.world.title);
    }
  };

  scene.onkeydown = function(e) {
    var code = e.keyCode || e.charCode;
    if (this.world.did_win) {
      if (code == C.K_SPACE) {
        this.current_level++;
        this.reload();
      }
      return;
    }

    if (this.world.is_casting) {
      if (code == C.K_UP) {
        this.world.cast_magic_up();
      } else if (code == C.K_DOWN) {
        this.world.cast_magic_down();
      } else if (code == C.K_LEFT) {
        this.world.cast_magic_left();
      } else if (code == C.K_RIGHT) {
        this.world.cast_magic_right();
      }
    } else {
      if (code == C.K_UP) {
        this.world.move_char_up();
      } else if (code == C.K_DOWN) {
        this.world.move_char_down();
      } else if (code == C.K_LEFT) {
        this.world.move_char_left();
      } else if (code == C.K_RIGHT) {
        this.world.move_char_right();
      }
    }

    if (code == C.K_SPACE) {
      if (this.world.is_casting) {
        this.world.stop_magic();
      } else {
        this.world.start_magic();
      }
    }
  };

  return scene;
})();