(function(){
  var submessage  = require('submessage.js'),
      C           = require('constants.js'),
      enchantment = require('enchantment.js'),
      poof        = require('poof.js'),
      world = {};

  world.init = function(title, win_condition) {
    this.objects = [];

    this.title = title;
    this.win_condition = win_condition;
    this.player_characters = [];
    this.highlighted_targets = null;
    this.poofs = null;
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

    if (this.is_casting) {
      this.draw_dimming();
    }

    if (this.did_win) {
      submessage.print('[SPACE] TO CONTINUE');
    } else {
      for (var i = 0, l = this.messages.length; i < l; i += 2) {
        if (this.messages[i+1](this)) {
          submessage.print(this.messages[i]);
          break;
        }
      }
    }
  };

  world.draw_enchantments = function(timer) {
    if (!this.highlighted_targets) {
      return;
    }

    for (var i = 0, l = this.highlighted_targets.length; i < l; i++) {
      if (this.highlighted_targets[i]) {
        enchantment.draw_for_obj(this.highlighted_targets[i], timer);
      }
    }
  };

  var _filter_duplicates = function(xs) {
    var res = [],
        val,
        last;

    for (var i = 0, l = xs.length; i < l; i++) {
      val = xs[i];
      if (last !== val) {
        res.push(val);
        last = val;
      }
    }

    return res;
  };

  var _positions_to_boxes = function (xs, ys) {
    var x_boxes = [],
        y_boxes = [],
        last = 0,
        s;

    for (var i = 0, l = xs.length; i < l; i++) {
      s = xs[i];
      if (s != last) {
        x_boxes.push([last, s - last]);
      }
      last = s + 1;
    }

    last = 0;
    for (var i = 0, l = ys.length; i < l; i++) {
      s = ys[i];
      if (s != last) {
        y_boxes.push([last, s - last]);
      }
      last = s + 1;
    }

    return [x_boxes, y_boxes];
  };

  var _numeric_sort = function (a, b) {
    return a - b;
  };

  world.draw_dimming = function() {
    var xs = [],
        ys = [],
        ctx = jerk.ctx,
        caster;

    for (var i = 0, l = this.player_characters.length; i < l; i++) {
      caster = this.player_characters[i];
      xs.push(caster.x);
      ys.push(caster.y);
    }
    xs.push(C.COLUMN_COUNT);
    ys.push(C.ROW_COUNT);

    console.log(xs);
    console.log(ys);

    xs = _filter_duplicates(xs.sort(_numeric_sort));
    ys = _filter_duplicates(ys.sort(_numeric_sort));

    console.log(xs);
    console.log(ys);

    boxes = _positions_to_boxes(xs, ys);
    var x_boxes = boxes[0],
        y_boxes = boxes[1];

    console.log(x_boxes);
    console.log(y_boxes);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    for (var i = 0, l = x_boxes.length; i < l; i++) {
      for (var j = 0, ll = y_boxes.length; j < ll; j++) {
        ctx.fillRect(
          C.UNIT_SIZE * x_boxes[i][0], C.UNIT_SIZE * y_boxes[j][0] + C.BUFFER_HEIGHT,
          C.UNIT_SIZE * x_boxes[i][1], C.UNIT_SIZE * y_boxes[j][1]
        );
      }
    }
  };

  world.draw_poofs = function() {
    var loc;

    if (this.poofs) {
      if (this.poofs.time && this.poofs.time >= 300) {
        this.poofs = null;
      } else {
        for (var i = 0, l = this.poofs.locations.length; i < l; i++) {
          loc = this.poofs.locations[i];
          poof.draw_at(loc[0], loc[1], Math.floor(this.poofs.time / 100));
        }
      }
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
    this.highlighted_targets = null;
    this.is_casting = false;
  };

  var between = function(x, a, b) {
    return (x < a && x > b);
  }

  world.find_target = function(caster, direction_index) {
    var distance = 100,
        target = null,
        test_distance,
        enchant_target,
        obj;

    for (var i = 0, l = this.objects.length; i < l; i++) {
      obj = this.objects[i];
      enchant_target = obj.enchant_target(caster, direction_index);
      if (!enchant_target) {
        continue;
      }

      if (direction_index + 1 == caster.compare_position(obj)) {
        test_distance = obj.distance_from(caster, direction_index);
        if (test_distance < distance) {
          distance = test_distance;
          target = enchant_target;
        }
      }
    }

    return target;
  };

  var move_char = function(dx, dy) {
    return function() {
      var move_sorted = this.player_characters.sort(function(a, b) {
        var ta = dx * a.x + dy * a.y,
            tb = dx * b.x + dy * b.y;

        return tb - ta;
      });
      for (var i = 0, l = move_sorted.length; i < l; i++) {
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
        })(this, move_sorted[i]);
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
        this.poofs = {
          locations: []
        };
        for (var i = 0, l = targets.length; i < l; i++) {
          if (targets[i] && this.highlighted_targets[i]) {
            this.transmute_objects(
              this.highlighted_targets[i],
              targets[i],
              targets[i] == this.player_characters[i]
            );
            this.poofs.locations.push([targets[i].true_x(), targets[i].true_y()]);
          } else if (this.highlighted_targets[i] && !targets[i]) {
            this.highlighted_targets[i].dechant();
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

  world.transmute_objects = function (source, drain, did_reflect) {
    source.dechant();

    if (!did_reflect) {
      var copy = Object.create(Object.getPrototypeOf(source));
      copy.init_from_repr(source.to_repr());
      copy.x = drain.x;
      copy.y = drain.y;

      this.add_object(copy);

      if (this.is_player_character(source)) {
        this.register_player_character(copy);
      }

      drain.dead = true;
    } else {
      if (source.type == '~wizard') {
        drain.special_image = null;
      } else {
        drain.special_image = source.get_image();
      }
    }
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