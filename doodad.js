(function() {
  var jerk        = require('jerk.js'),
      C           = require('constants.js'),
      grid_object = require('grid_object.js'),
      attrs       = require('attributes.js'),
      doodad      = Object.create(grid_object);


  doodad.type = '~doodad';

  doodad.init_from_repr = function(repr) {
    grid_object.init_from_repr.call(this, repr);
    this.image = repr[3];
  };

  doodad.draw = function() {
    var ctx = jerk.ctx;

    ctx.fillStyle = '#ff0';
    ctx.fillRect(
      this.true_x(), this.true_y(),
      C.UNIT_SIZE, C.UNIT_SIZE
    );
  };

  doodad.on_collide = attrs.fixed;

  return doodad;
})();