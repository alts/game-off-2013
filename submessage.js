(function(){
  var jerk       = require('jerk.js'),
      C          = require('constants.js'),
      submessage = {};

  submessage.draw = function() {
    var ctx = jerk.ctx;

    ctx.fillStyle = '#fff';
    ctx.fillText('[space] to continue', 10, C.TEXT_AREA_Y + 10);
  };

  return submessage;
})();