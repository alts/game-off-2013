(function(){
  var jerk        = require('jerk.js'),
      C           = require('constants.js'),
      grid_object = require('grid_object.js'),
      attrs       = require('attributes.js'),
      images      = require('images.js'),
      door        = Object.create(grid_object);

  door.type = '~door';

  door.init_from_repr = function (repr) {
    grid_object.init_from_repr.call(this, repr);
    this.is_open = false;
    this.entered_from_direction = -1;
    this.state_after_true_exit = false;
  };

  door.draw = function() {
    var ctx = jerk.ctx;

    if (this.is_open) {
      ctx.fillStyle = '#222';
    } else {
      ctx.fillStyle = '#666';
    }

    ctx.fillRect(
      this.true_x(), this.true_y(),
      C.UNIT_SIZE, C.UNIT_SIZE
    );
  };

  var deltas_to_direction = function (dx, dy) {
    if (dx == 1) {
      return C.D_LEFT;
    } else if (dx == -1) {
      return C.D_RIGHT;
    } else if (dy == 1) {
      return C.D_UP;
    } else if (dy == -1) {
      return C.D_DOWN;
    }
  };

  door.on_collide = function (other, dx, dy, world_objects) {
    this.state_after_true_exit = !this.is_open;
    this.is_open = true;

    this.entered_from_direction = deltas_to_direction(dx, dy);

    return attrs.passthrough(other, dx, dy, world_objects);
  };

  door.on_exit = function (other, dx, dy, world_objects) {
    var exit_direction = deltas_to_direction(-dx, -dy);
    if (exit_direction == this.entered_from_direction) {
      // returned from direction entered
      this.is_open = !this.state_after_true_exit;
    } else {
      this.is_open = this.state_after_true_exit;
    }
  };

  door.can_be_enchanted = function () {
    return !this.is_open;
  };

  return door;
})();