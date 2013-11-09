(function() {
  var jerk        = require('jerk.js'),
      C           = require('constants.js'),
      grid_object = require('grid_object.js'),
      wizard = Object.create(grid_object);

  wizard.type = '~wizard';

  wizard.init_from_repr = function(repr) {
    grid_object.init_from_repr.call(this, repr);
    this.consumed_map = {};
  };

  wizard.draw = function() {
    var ctx = jerk.ctx;

    ctx.fillStyle = '#00f';
    ctx.fillRect(
      this.true_x(), this.true_y(),
      C.UNIT_SIZE, C.UNIT_SIZE
    );
  };

  wizard.consume = function(consumable_type) {
    if (!this.consumed_map[consumable_type]) {
      this.consumed_map[consumable_type] = 0;
    }
    this.consumed_map[consumable_type]++;
  };

  wizard.num_consumed = function(consumable_type) {
    return this.consumed_map[consumable_type] || 0;
  };

  return wizard;
})();