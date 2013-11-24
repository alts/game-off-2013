(function(){
  var jerk        = require('jerk.js'),
      C           = require('constants.js'),
      grid_object = require('grid_object.js'),
      attrs       = require('attributes.js'),
      images      = require('images.js'),
      key         = Object.create(grid_object);

  key.type = '~key';

  key.draw = function() {
    var ctx = jerk.ctx;

    if (!images.draw(jerk.ctx, this.image, this.true_x(), this.true_y())) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(
        this.true_x(), this.true_y(),
        C.UNIT_SIZE, C.UNIT_SIZE
      );
    }
  };

  key.on_collide = attrs.consumable;

  return key;
})();