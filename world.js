(function(){
  var world = {};

  world.init = function(title, win_condition) {
    this.objects = [];

    this.title = title;
    this.win_condition = win_condition;
    this.player_character = null;
    this.potential_targets = [null, null, null, null];
  };

  world.add_object = function(obj) {
    this.objects.push(obj);
  };

  world.register_player_character = function(obj) {
    this.player_character = obj;
  };

  world.draw = function() {
    var obj;
    for (var i = 0, l = this.objects.length; i < l; i++) {
      obj = this.objects[i];
      obj.draw();
    }
  };

  world.satisfies_win_condition = function() {
    return this.win_condition(this);
  };

  world.start_magic = function() {
    var magic_is_active = this.player_character.toggle_casting();
    if (magic_is_active) {
      this.remember_targets();
    } else {
      this.forget_targets();
    }
  };

  var between = function(x, a, b) {
    return (x < a && x > b);
  }

  world.remember_targets = function() {
    var p_x = this.player_character.x,
        p_y = this.player_character.y,
        targets = this.potential_targets,
        obj;

    // targets:
    // [left, up, right, down]

    for (var i = 0, l = this.objects.length; i < l; i++) {
      obj = this.objects[i];
      if (obj.x == p_x) {
        // same column
        if (obj.y < p_y) {
          if (!targets[1] || obj.y > targets[1].y) {
            targets[1] = obj;
          }
        } else if (obj.y > p_y) {
          if (!targets[3] || obj.y < targets[3].y) {
            targets[3] = obj;
          }
        }
      } else if (obj.y == p_y) {
        // same row
        if (obj.x < p_x) {
          if (!targets[0] || obj.x > targets[0].x) {
            targets[0] = obj;
          }
        } else if (obj.x > p_x) {
          if (!targets[2] || obj.x < targets[2].x) {
            targets[2] = obj;
          }
        }
      }
    }
  };

  world.forget_targets = function() {
    for (var i = 0; i < 4; i++) {
      this.potential_targets[i] = null;
    }
  };

  move_char = function(dx, dy) {
    return function() {
      if (this.player_character.is_casting) {
        return false;
      }

      var tx = this.player_character.x + dx,
          ty = this.player_character.y + dy,
          obj;

      for (var i = 0, l = this.objects.length; i < l; i++) {
        obj = this.objects[i];
        if (obj.x == tx && obj.y == ty) {
          if (obj.on_collide(this.player_character, dx, dy, this.objects)) {
            // allow character position change
            break;
          } else {
            // prevent character position change
            return false;
          }
        }
      }

      this.player_character.x = tx;
      this.player_character.y = ty;
      this.on_step();
    };
  };

  world.move_char_right = move_char( 1,  0);
  world.move_char_left  = move_char(-1,  0);
  world.move_char_up    = move_char( 0, -1);
  world.move_char_down  = move_char( 0,  1);

  var cast_magic = function(dx, dy) {

  };

  world.on_step = function() {
    if (this.satisfies_win_condition()) {
      console.log('win');
    }

    var obj;

    for (var i = this.objects.length - 1, l = -1; i > l; i--) {
      obj = this.objects[i];
      if (obj.dead) {
        this.objects.splice(i, 1);
      }
    }
  };

  return world;
})();