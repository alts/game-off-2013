(function() {
  var jerk        = require('jerk.js'),
      C           = require('constants.js'),
      grid_object = require('grid_object.js'),
      attrs       = require('attributes.js'),
      crate       = Object.create(grid_object);

  crate.type = '~crate';

  crate.draw = function() {
    var ctx = jerk.ctx;

    ctx.fillStyle = '#f96';
    ctx.fillRect(
      this.true_x(), this.true_y(),
      C.UNIT_SIZE, C.UNIT_SIZE
    );
  };

  attrs.is_pushable(crate);

  return crate;
})();