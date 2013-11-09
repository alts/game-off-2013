(function(){
  var world = {};

  world.init = function(title, win_condition) {
    this.objects = [];
    this.title = title;
    this.win_condition = win_condition;
    this.player_character = null;
  };

  world.add_object = function(obj) {
    this.objects.push(obj);
  };

  world.register_player_character = function(obj) {
    this.player_character = obj;
  };

  world.draw = function() {
    var obj;
    for (var i = 0, l = this.objects.length; i < l; i++) {
      obj = this.objects[i];
      obj.draw();
    }
  };

  world.satisfies_win_condition = function() {
    return this.win_condition(this);
  };

  move_char = function(dx, dy) {
    return function() {
      var tx = this.player_character.x + dx,
          ty = this.player_character.y + dy,
          obj;

      for (var i = 0, l = this.objects.length; i < l; i++) {
        obj = this.objects[i];
        if (obj.x == tx && obj.y == ty) {
          if (obj.on_collide(this.player_character, dx, dy, this.objects)) {
            // allow character position change
            break;
          } else {
            // prevent character position change
            return false;
          }
        }
      }

      this.player_character.x = tx;
      this.player_character.y = ty;
      this.on_step();
    };
  };

  world.on_step = function() {
    if (this.satisfies_win_condition()) {
      console.log('win');
    }

    var obj;

    for (var i = this.objects.length - 1, l = -1; i > l; i--) {
      obj = this.objects[i];
      if (obj.dead) {
        this.objects.splice(i, 1);
      }
    }
  };

  world.move_char_right = move_char( 1,  0);
  world.move_char_left  = move_char(-1,  0);
  world.move_char_up    = move_char( 0, -1);
  world.move_char_down  = move_char( 0,  1);

  return world;
})();