(function(){
  var jerk       = require('jerk.js'),
      images     = require('images.js'),
      image_font = {};

  var load_image = function(path) {
    var d = document.createElement('img');
    d.src = path;
    return d;
  };

  image_font.image = load_image('font.gif');
  image_font.height = 8;
  image_font.width = 8;

  image_font.letters = {
    // letter: x, y
    ' ': [8, 8],
    '[': [88, 40],
    ']': [104, 40],
    'A': [8, 32],
    'B': [16, 32],
    'C': [24, 32],
    'D': [32, 32],
    'E': [40, 32],
    'F': [48, 32],
    'G': [56, 32],
    'H': [64, 32],
    'I': [72, 32],
    'J': [80, 32],
    'K': [88, 32],
    'L': [96, 32],
    'M': [104, 32],
    'N': [112, 32],
    'O': [120, 32],
    'P': [0, 40],
    'Q': [8, 40],
    'R': [16, 40],
    'S': [24, 40],
    'T': [32, 40],
    'U': [40, 40],
    'V': [48, 40],
    'W': [56, 40],
    'X': [64, 40],
    'Y': [72, 40],
    'Z': [80, 40]
  };

  image_font.print = function (text, x, y) {
    var ctx = jerk.ctx,
        char_info;

    for (var i = 0, l = text.length; i < l; i++) {
      char_info = this.letters[text[i]];
      ctx.drawImage(
        this.image,
        char_info[0], char_info[1],
        this.width, this.height,
        x, y,
        this.width, this.height
      );

      x += this.width;
    }
  };

  image_font.print_centered = function (text, x, y) {
    var width = 0,
        char_info;

    for (var i = 0, l = text.length; i < l; i++) {
      width += this.width;
    }

    return this.print(text, x - width/2, y);
  };

  return image_font;
})();