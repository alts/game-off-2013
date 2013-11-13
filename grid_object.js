(function(){
  var grid_object = {},
      C = require('constants.js');

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

  grid_object.on_collide = function(player, dx, dy, objects) {
    // noop, effectively prevent collisions
  };

  grid_object.enchant = function() {
    this.glowing = true;
  };

  grid_object.dechant = function() {
    this.glowing = false;
  };

  return grid_object;
})();