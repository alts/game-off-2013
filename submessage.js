(function(){
  var image_font = require('image_font.js'),
      C          = require('constants.js'),
      submessage = {};

  submessage.print = function(text) {
    return image_font.print_centered(
      text,
      C.SCREEN_WIDTH / 2, C.TEXT_AREA_Y + 10
    );
  };

  return submessage;
})();