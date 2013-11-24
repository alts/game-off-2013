(function() {
  var jerk        = require('jerk.js'),
      C           = require('constants.js'),
      grid_object = require('grid_object.js'),
      attrs       = require('attributes.js'),
      images      = require('images.js'),
      crate       = Object.create(grid_object);

  crate.type = '~crate';

  crate.draw = function() {
    images.draw(
      jerk.ctx,
      'crate.png',
      this.true_x(), this.true_y()
    );
  };

  attrs.is_pushable(crate);

  return crate;
})();