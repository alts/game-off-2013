(function() {
  var load_image = function(path) {
    var d = document.createElement('img');
    d.src = path;
    return d;
  };

  return {
    draw: function (ctx, path, x, y, frame) {
      if (frame) {
        path = path + '#' + frame;
      }
      var image_data = this[path];

      if (!image_data) {
        return false;
      }

      ctx.drawImage(
        image_data[0],
        image_data[1], image_data[2],
        32, 32,
        x, y,
        32, 32
      );

      return true;
    },

    'food.png': [load_image('food.png'), 0, 0],
    'card_one.png': [load_image('cards.png'), 0, 0],
    'card_two.png': [load_image('cards.png'), 32, 0],
    'card_three.png': [load_image('cards.png'), 64, 0],
    'card_four.png': [load_image('cards.png'), 96, 0],
    'wizards2.png#0': [load_image('wizards2.png'), 0, 0],
    'wizards2.png#1': [load_image('wizards2.png'), 32, 0],
    'crate.png': [load_image('crate.png'), 0, 0]
  };
})();