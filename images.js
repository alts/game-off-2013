(function() {
  var load_image = function(path) {
    var d = document.createElement('img');
    d.src = path;
    return d;
  };

  var wizards = load_image('wizards2.png'),
      cards = load_image('cards.png'),
      vases = load_image('vases.png'),
      crime = load_image('crime.png');

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

    'apple.png': [load_image('apple.png'), 0, 0],
    'card_one.png': [cards, 0, 0],
    'card_two.png': [cards, 32, 0],
    'card_three.png': [cards, 64, 0],
    'card_four.png': [cards, 96, 0],
    'wizards2.png#0': [wizards, 0, 0],
    'wizards2.png#1': [wizards, 32, 0],
    'crate.png': [load_image('crate.png'), 0, 0],
    'vase.png': [vases, 0, 0],
    'broken_vase.png': [vases, 32, 0],
    // half width
    'wand_normal.png': [wizards, 64, 0],
    'wand_raised.png': [wizards, 80, 0],
    'corpse.png': [crime, 0, 0],
    'weapon.png': [crime, 32, 0],
    'wall.png': [load_image('wall.png'), 0, 0]
  };
})();