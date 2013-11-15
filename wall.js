(function() {
  var jerk        = require('jerk.js'),
      C           = require('constants.js'),
      grid_object = require('grid_object.js'),
      attrs       = require('attributes.js'),
      wall        = Object.create(grid_object);

  wall.type = '~wall';

  wall.init_from_repr = function(repr) {
    grid_object.init_from_repr.call(this, repr);
    this.junction = 0;
  };

  wall.form_junction = function(wall_grid) {
  };

  wall.draw = function() {
    var ctx = jerk.ctx;

    ctx.fillStyle = '#305';
    ctx.fillRect(
      this.true_x(), this.true_y(),
      C.UNIT_SIZE, C.UNIT_SIZE
    );
  };

  wall.on_collide = attrs.fixed;

  return wall;
})();