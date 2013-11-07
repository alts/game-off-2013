(function(){
  var progress = {},
      levels = require('levels.js');

  progress.level_count = levels.length;
  progress.current_level = 0;
  progress.accessible_level = 0;

  progress.next_level = function() {
    if (this.current_level == this.accessible_level) {
      this.accessible_level++;
    }
    this.current_level++;
  };

  progress.select_level = function(level_i) {
    if (level_i >= 0 && level_i <= this.accessible_level) {
      this.current_level = level_i;
      return true;
    }
    return false;
  };

  return progress;
})();