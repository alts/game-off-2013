(function(){
  var grid_object = {},
      attrs       = require('attributes.js'),
      C           = require('constants.js');

  grid_object.init_from_repr = function(repr) {
    this.x = repr[1];
    this.y = repr[2];
    this.dead = false;
    this.glowing = false;
  };

  grid_object.to_repr = function() {
    return [this.type, this.x, this.y];
  };

  grid_object.true_x = function() {
    return this.x * C.UNIT_SIZE;
  };

  grid_object.true_y = function() {
    return C.BUFFER_HEIGHT + this.y * C.UNIT_SIZE;
  };

  grid_object.on_collide = attrs.standard_collision;

  grid_object.on_exit = function(player, dx, dy, objects){};

  grid_object.enchant = function() {
    this.glowing = true;
  };

  grid_object.dechant = function() {
    this.glowing = false;
  };

  // returns the position of the receiver relative to the argument
  // 0 = same position
  // the following four positions map roughly to the indexes for
  //   world.potential_targets
  // 1 = same row, right of
  // 2 = same column, below
  // 3 = same row, left of
  // 4 = same column, above
  //
  // 5 = greater x, lesser y
  // 6 = greater x, greater y
  // 7 = lesser x, greater y
  // 8 = lesser x, lesser y
  grid_object.compare_position = function(other) {
    if (this.x > other.x) {
      if (this.y > other.y) {
        return 6;
      } else if (this.y < other.y) {
        return 5;
      } else {
        return 1;
      }
    } else if (this.x < other.x) {
      if (this.y > other.y) {
        return 7;
      } else if (this.y < other.y) {
        return 8;
      } else {
        return 3;
      }
    } else {
      if (this.y > other.y) {
        return 2;
      } else if (this.y < other.y) {
        return 4;
      } else {
        return 0;
      }
    }
  };

  grid_object.distance_from = function(other, direction) {
    if (direction == 0) {
      return other.x - this.x;
    } else if (direction == 2) {
      return this.x - other.x;
    } else if (direction == 1) {
      return other.y - this.y;
    } else if (direction == 3) {
      return this.y - other.y;
    }
  };

  grid_object.can_be_enchanted = function() {
    // object, by default, are enchantable
    return true;
  };

  grid_object.is_passable = function() {
    return false;
  };

  return grid_object;
})();