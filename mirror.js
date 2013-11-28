(function() {
  var jerk        = require('jerk.js'),
      C           = require('constants.js'),
      grid_object = require('grid_object.js'),
      attrs       = require('attributes.js'),
      images      = require('images.js'),
      mirror      = Object.create(grid_object);

  mirror.type = '~mirror';

  mirror.draw = function() {
    var ctx = jerk.ctx;

    if (!images.draw(ctx, 'mirror.png', this.true_x(), this.true_y())) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(
        this.true_x(), this.true_y(),
        C.UNIT_SIZE, C.UNIT_SIZE
      );
    }
  };

  mirror.enchant_target = function(caster, direction) {
    return caster;
  };

  return mirror;
})();