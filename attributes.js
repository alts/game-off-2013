(function(){
  var attributes = {},
      comparators = require('comparators.js'),
      noop = function(){};

  attributes.standard_collision = function(other, dx, dy, world_objects) {
    return [this.is_passable(), noop];
  };

  attributes.pushable = function(other, dx, dy, world_objects){
    var to_move = [],
        i_limit = 0,
        position_direction,
        comparator,
        key,
        obj;

    if (dx == 1) {
      position_direction = 3;
      comparator = comparators.row_increasing;
      key = 'x';
    } else if (dx == -1) {
      position_direction = 1;
      comparator = comparators.row_decreasing;
      key = 'x';
    } else if (dy == 1) {
      position_direction = 4;
      comparator = comparators.col_increasing;
      key = 'y';
    } else if (dy == -1) {
      position_direction = 2;
      comparator = comparators.col_decreasing;
      key = 'y';
    }


    for (var i = 0, l = world_objects.length; i < l; i++) {
      obj = world_objects[i];
      if (position_direction == other.compare_position(obj)) {
        to_move.push(obj);
      }
    }

    to_move.sort(comparator);
    var s = this[key] - 1;
    for (var i = 0, l = to_move.length; i < l; i++) {
      obj = to_move[i];
      if (!obj.is_passable()) {
        if (Math.abs(obj[key] - s) > 1) {
          break;
        }
        if (!obj.is_pushable) {
          return [false, noop];
        }

        s = obj[key];
      }

      i_limit++;
    }

    for (var i = 0; i < i_limit; i++) {
      if (!to_move[i].is_passable()) {
        to_move[i].x += dx;
        to_move[i].y += dy;
      }
    }

    return [true, function(){
      for (var i = 0; i < i_limit; i++) {
        if (!to_move[i].is_passable()) {
          to_move[i].x -= dx;
          to_move[i].y -= dy;
        }
      }
    }];
  };

  attributes.is_pushable = function(obj) {
    obj.is_pushable = true;
    obj.on_collide = attributes.pushable;
  }

  attributes.consumable = function(player, dx, dy, world_objects) {
    this.dead = true;
    player.consume(this.type);
    return [true, function(){
      this.dead = false;
      player.unconsume(this.type);
    }];
  };

  return attributes;
})();