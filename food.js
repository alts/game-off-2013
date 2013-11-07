(function() {
  var jerk        = require('jerk.js'),
      C           = require('constants.js'),
      grid_object = require('grid_object.js'),
      food        = Object.create(grid_object);

  food.type = '~food';

  food.init_from_repr = function(repr) {
    grid_object.init_from_repr.call(this, repr);
  };

  food.draw = function() {
    var ctx = jerk.ctx;

    ctx.fillStyle = '#f00';
    ctx.fillRect(
      this.true_x(), this.true_y(),
      C.UNIT_SIZE, C.UNIT_SIZE
    );
  };

  return food;
})();