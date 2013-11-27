(function() {
  var jerk        = require('jerk.js'),
      C           = require('constants.js'),
      grid_object = require('grid_object.js'),
      images      = require('images.js'),
      wizard = Object.create(grid_object);

  wizard.type = '~wizard';

  wizard.init_from_repr = function(repr) {
    grid_object.init_from_repr.call(this, repr);
    this.consumed_map = {};
    this.is_casting = false;
    this.special_image = null;
    if (repr.length > 3) {
      this.special_image = repr[3];
    }
  };

  wizard.to_repr = function() {
    var repr = grid_object.to_repr.call(this);
    if (this.special_image) {
      repr.push(this.special_image);
    }
    return repr;
  };

  wizard.draw = function() {
    var ctx = jerk.ctx;

    if (!this.special_image) {
      images.draw(
        ctx,
        'wizards2.png',
        this.true_x(), this.true_y(),
        (this.is_casting) ? '1' : '0'
      );
    } else {
      images.draw(
        ctx,
        this.special_image,
        this.true_x(), this.true_y()
      );

      var wand_img_info;
      if (this.is_casting) {
        wand_img_info = images['wand_raised.png'];
      } else {
        wand_img_info = images['wand_normal.png'];
      }
      ctx.drawImage(
        wand_img_info[0],
        wand_img_info[1], wand_img_info[2],
        16, 32,
        this.true_x(), this.true_y(),
        16, 32
      );
    }
  };

  // player specific
  wizard.consume = function(consumable_type) {
    if (!this.consumed_map[consumable_type]) {
      this.consumed_map[consumable_type] = 0;
    }
    this.consumed_map[consumable_type]++;
  };

  wizard.unconsume = function(consumable_type) {
    if (!this.consumed_map[consumable_type]) {
      return;
    }
    this.consumed_map[consumable_type]--;
  };

  wizard.num_consumed = function(consumable_type) {
    return this.consumed_map[consumable_type] || 0;
  };

  wizard.toggle_casting = function() {
    this.is_casting = !this.is_casting;
    return this.is_casting;
  };

  return wizard;
})();