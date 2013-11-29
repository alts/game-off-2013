(function() {
  var image_font  = require('image_font.js'),
      C           = require('constants.js'),
      level_title = {};

  level_title.draw = function(level_name) {
    return image_font.print_centered(
      'WIZARD ' + level_name,
      C.SCREEN_WIDTH / 2, 10
    );
  };

  return level_title;
})();