(function(){
  var jerk   = require('jerk.js'),
      images = require('images.js'),
      poof   = {};

  poof.draw_at = function(x, y, stage) {
    images.draw(jerk.ctx, 'poof.png', x, y, stage);
  };

  return poof;
})();