(function() {
  var jerk        = require('jerk.js'),
      C           = require('constants.js'),
      grid_object = require('grid_object.js'),
      wizard = Object.create(grid_object);

  wizard.init_from_repr = function(repr) {
    grid_object.init_from_repr.call(this, repr);
  };

  wizard.draw = function() {
    var ctx = jerk.ctx;

    ctx.fillStyle = '#00f';
    ctx.fillRect(
      this.true_x(), this.true_y(),
      C.UNIT_SIZE, C.UNIT_SIZE
    );
  };

  return wizard;
})();