(function(){
  var levels = require('levels.js'),
      world  = require('world.js'),
      symbol_map = {
        '~wizard': require('wizard.js'),
        '~food':   require('food.js'),
        '~crate':  require('crate.js'),
        '~doodad': require('doodad.js'),
        '~wall':   require('wall.js'),
        '~key':    require('key.js'),
        '~door':   require('door.js')
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

    if (level.walls) {
      var x, y, dx, dy, wall;
      for (var i = 0, l = level.walls.length; i < l; i += 4) {
        x = level.walls[i];
        y = level.walls[i+1];
        for (var j = 0, x_limit = level.walls[i+2]; j <= x_limit; j++) {
          for (var k = 0, y_limit = level.walls[i+3]; k <= y_limit; k++) {
            wall = Object.create(symbol_map['~wall']);
            wall.init_from_repr(['~wall', x + j, y + k]);
            current_world.add_object(wall);
          }
        }
      }
    }

    return current_world;
  };
})();