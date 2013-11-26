(function() {
  var jerk        = require('jerk.js'),
      C           = require('constants.js'),
      grid_object = require('grid_object.js'),
      attrs       = require('attributes.js'),
      images      = require('images.js'),
      doodad      = Object.create(grid_object);


  doodad.type = '~doodad';

  doodad.init_from_repr = function(repr) {
    grid_object.init_from_repr.call(this, repr);
    this.image = repr[3];
  };

  doodad.to_repr = function() {
    var repr = grid_object.to_repr.call(this);
    repr.push(this.image);
    return repr;
  };

  doodad.draw = function() {
    var ctx = jerk.ctx;

    if (!images.draw(jerk.ctx, this.image, this.true_x(), this.true_y())) {
      ctx.fillStyle = '#ff0';
      ctx.fillRect(
        this.true_x(), this.true_y(),
        C.UNIT_SIZE, C.UNIT_SIZE
      );
    }
  };

  return doodad;
})();