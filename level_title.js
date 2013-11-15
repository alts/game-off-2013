(function() {
  var jerk = require('jerk.js'),
      level_title = {};

  level_title.draw = function(level_name) {
    var ctx = jerk.ctx;

    ctx.fillStyle = '#fff';
    ctx.fillText('WIZARD ' + level_name, 10, 10);
  };

  return level_title;
})();