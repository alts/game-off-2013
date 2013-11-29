(function(){
  var jerk        = require('jerk.js'),
      C           = require('constants.js'),
      enchantment = {};

  enchantment._timer_to_color = function(timer) {
    var c = timer;
    if (c < 255) {
      return 'rgb(' + Math.floor(255 - c) + ',' + Math.floor(c) + ', 0)';
    }
    c -= 255;
    if (c < 255) {
      return 'rgb(0, ' + Math.floor(255 - c) + ',' + Math.floor(c) + ')';
    }
    c -= 255;
    return 'rgb(' + Math.floor(c) + ', 0, ' + Math.floor(255 - c) + ')';
  };

  enchantment.draw_for_obj = function (obj, timer) {
    var ctx = jerk.ctx,
        x = obj.true_x(),
        y = obj.true_y(),
        line_unit = C.UNIT_SIZE / 3;

    ctx.strokeStyle = this._timer_to_color(timer);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + line_unit, y);
    ctx.moveTo(x + line_unit * 2, y);
    ctx.lineTo(x + C.UNIT_SIZE, y);
    ctx.lineTo(x + C.UNIT_SIZE, y + line_unit);
    ctx.moveTo(x + C.UNIT_SIZE, y + 2 * line_unit);
    ctx.lineTo(x + C.UNIT_SIZE, y + C.UNIT_SIZE);
    ctx.lineTo(x + line_unit * 2, y + C.UNIT_SIZE);
    ctx.moveTo(x + line_unit, y + C.UNIT_SIZE);
    ctx.lineTo(x, y + C.UNIT_SIZE);
    ctx.lineTo(x, y + 2 * line_unit);
    ctx.moveTo(x, y + line_unit);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  return enchantment;
})();