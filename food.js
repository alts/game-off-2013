(function() {
  var jerk        = require('jerk.js'),
      C           = require('constants.js'),
      grid_object = require('grid_object.js'),
      attrs       = require('attributes.js'),
      images      = require('images.js'),
      food        = Object.create(grid_object);

  food.type = '~food';
  food.image = 'apple.png';

  food.draw = function() {
    images.draw(
      jerk.ctx,
      this.image,
      this.true_x(), this.true_y()
    );
  };

  food.on_collide = attrs.consumable;

  return food;
})();