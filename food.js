(function() {
  var jerk        = require('jerk.js'),
      C           = require('constants.js'),
      grid_object = require('grid_object.js'),
      attrs       = require('attributes.js'),
      food        = Object.create(grid_object);

  food.type = '~food';

  food.draw = function() {
    var ctx = jerk.ctx;

    ctx.fillStyle = '#f00';
    ctx.fillRect(
      this.true_x(), this.true_y(),
      C.UNIT_SIZE, C.UNIT_SIZE
    );
  };

  food.on_collide = attrs.consumable;

  return food;
})();