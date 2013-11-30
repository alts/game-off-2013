(function() {
  var jerk        = require('jerk.js'),
      C           = require('constants.js'),
      grid_object = require('grid_object.js'),
      grate = Object.create(grid_object);

  grate.enchant_target = function (caster, direction) {
    return null;
  };

  grate.draw = function() {
    var ctx = jerk.ctx;

    ctx.fillStyle = '#0ff';
    ctx.fillRect(
      this.true_x(), this.true_y(),
      C.UNIT_SIZE, C.UNIT_SIZE
    );
  };

  return grate;
})();