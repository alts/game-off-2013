(function(){
  var levels = require('levels.js'),
      world  = require('world.js'),
      symbol_map = {
        '~wizard': require('wizard.js')
      };

  return function(level_i) {
    var level,
        current_world,
        obj_repr,
        obj_symbol,
        obj;

    if (level_i >= levels.length || level_i < 0) {
      return false;
    }

    level = levels[level_i];
    current_world = Object.create(world);

    current_world.init(level.title, level.win);

    for (var i = 0, l = level.objs.length; i < l; i++) {
      obj_repr = level.objs[i];
      obj_symbol = obj_repr[0];
      obj = Object.create(symbol_map[obj_symbol]);

      obj.init_from_repr(obj_repr);
      current_world.add_object(obj);

      if (i === 0) {
        current_world.register_player_character(obj);
      }
    }

    return current_world;
  };
})();