(function(){
  var jerk        = require('jerk.js'),
      C           = require('constants.js'),
      grid_object = require('grid_object.js'),
      locked_door = Object.create(grid_object);

  locked_door.on_collide = function (other, dx, dy, world_objects) {
    if (other.num_consumed('~key') > 0) {
      other.unconsume('~key');
      this.dead = true;
      return [true, function(){}];
    }

    return [false, function(){}];
  };

  locked_door.enchant_target = function() {
    return null;
  };

  locked_door.draw = function () {
    var ctx = jerk.ctx;
    ctx.fillStyle = '#950';
    ctx.fillRect(
      this.true_x(), this.true_y(),
      C.UNIT_SIZE, C.UNIT_SIZE
    );
  };

  return locked_door;
})();