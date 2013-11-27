(function(){
  var world = {};

  world.init = function(title, win_condition) {
    this.objects = [];

    this.title = title;
    this.win_condition = win_condition;
    this.player_characters = [];
    this.highlighted_targets = null;
    this.did_win = false;
    this.is_casting = false;
  };

  world.add_object = function(obj) {
    this.objects.push(obj);
  };

  world.register_player_character = function(obj) {
    this.player_characters.push(obj);
  };

  world.is_player_character = function(obj) {
    for (var i = 0, l = this.player_characters.length; i < l; i++) {
      if (obj == this.player_characters[i]) {
        return true;
      }
    }
    return false;
  };

  world.draw = function() {
    var obj;
    for (var i = 0, l = this.objects.length; i < l; i++) {
      obj = this.objects[i];
      if (!this.is_player_character(obj)) {
        obj.draw();
      }
    }

    for (var i = 0, l = this.player_characters.length; i < l; i++) {
      this.player_characters[i].draw();
    }
  };

  world.satisfies_win_condition = function() {
    return this.win_condition(this);
  };

  world.start_magic = function() {
    for (var i = 0, l = this.player_characters.length; i < l; i++) {
      if (!this.player_characters[i].is_casting) {
        this.player_characters[i].toggle_casting();
      }
    }
    this.is_casting = true;
  };

  world.stop_magic = function() {
    for (var i = 0, l = this.player_characters.length; i < l; i++) {
      if (this.player_characters[i].is_casting) {
        this.player_characters[i].toggle_casting();
      }
    }
    this.is_casting = false;
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
      if (obj.can_be_enchanted()) {
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
    }
  };

  world.find_target = function(caster, direction_index) {
    var distance = 100,
        target = null,
        test_distance,
        obj;

    for (var i = 0, l = this.objects.length; i < l; i++) {
      obj = this.objects[i];
      if (!obj.can_be_enchanted()) {
        continue;
      }

      if (direction_index + 1 == caster.compare_position(obj)) {
        test_distance = obj.distance_from(caster, direction_index);
        if (test_distance < distance) {
          distance = test_distance;
          target = obj;
        }
      }
    }

    return target;
  };

  world.forget_targets = function() {
    for (var i = 0, l = this.highlighted_targets.length; i < l; i++) {
      this.highlighted_targets[i] = null;
    }
  };

  var move_char = function(dx, dy) {
    return function() {
      for (var i = 0, l = this.player_characters.length; i < l; i++) {
        (function(that, caster) {
          var tx = caster.x + dx,
              ty = caster.y + dy,
              rollbacks = [],
              valid,
              obj;

          for (var i = 0, l = that.objects.length; i < l; i++) {
            obj = that.objects[i];
            if (obj.x == tx && obj.y == ty) {
              valid = obj.on_collide(caster, dx, dy, that.objects);
              rollbacks.push(valid[1]);
              if (!valid[0]) {
                // prevent character position change
                for (var j = 0, ll = rollbacks.length; j < ll; j++) {
                  rollbacks[j]();
                }
                return false;
              }
            }
          }

          for (var i = 0, l = that.objects.length; i < l; i++) {
            obj = that.objects[i];
            if (caster.compare_position(obj) == 0) {
              obj.on_exit(caster, dx, dy, that.objects);
            }
          }

          caster.x = tx;
          caster.y = ty;
        })(this, this.player_characters[i]);
      }
      this.on_step();
    };
  };

  world.move_char_right = move_char( 1,  0);
  world.move_char_left  = move_char(-1,  0);
  world.move_char_up    = move_char( 0, -1);
  world.move_char_down  = move_char( 0,  1);

  var cast_magic = function(direction_index) {
    return function() {
      var targets = [],
          any_hit = false,
          caster;
      for (var i = 0, l = this.player_characters.length; i < l; i++) {
        caster = this.player_characters[i];
        targets.push(this.find_target(caster, direction_index));
      }

      if (this.highlighted_targets) {
        for (var i = 0, l = targets.length; i < l; i++) {
          if (targets[i] && this.highlighted_targets[i]) {
            this.transmute_objects(this.highlighted_targets[i], targets[i]);
          } else if (this.highlighted_targets[i] && !targets[i]) {
            this.highlighted_targets.dechant();
          }
        }
        this.highlighted_targets = null;
        this.on_step();
        this.stop_magic();
      } else {
        this.highlighted_targets = targets;
        for (var i = 0, l = targets.length; i < l; i++) {
          if (targets[i]) {
            targets[i].enchant();
          }
        }
      }
    }
  };

  world.cast_magic_right = cast_magic(2);
  world.cast_magic_left  = cast_magic(0);
  world.cast_magic_up    = cast_magic(1);
  world.cast_magic_down  = cast_magic(3);

  world.transmute_objects = function (source, drain) {
    source.dechant();

    var copy = Object.create(Object.getPrototypeOf(source));
    copy.init_from_repr(source.to_repr());
    copy.x = drain.x;
    copy.y = drain.y;

    this.add_object(copy);
    drain.dead = true;
    return true;
  };

  world.select_drain = function(target) {
    var to_copy = this.highlighted_targets[0];
    to_copy.dechant();

    var copy = Object.create(Object.getPrototypeOf(to_copy));
    copy.init_from_repr(to_copy.to_repr());
    copy.x = target.x;
    copy.y = target.y;

    this.add_object(copy);
    target.dead = true;

    this.on_step();
    this.start_magic();
    return true;
  };

  world.on_step = function() {
    var obj;

    for (var i = this.objects.length - 1, l = -1; i > l; i--) {
      obj = this.objects[i];
      if (obj.dead) {
        this.objects.splice(i, 1);
      }
    }

    for (var i = this.player_characters.length - 1, l = -1; i > l; i--) {
      obj = this.player_characters[i];
      if (obj.dead) {
        this.player_characters.splice(i, 1);
      }
    }

    if (this.satisfies_win_condition()) {
      this.did_win = true;
    }
  };

  return world;
})();