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

  world.move_char_right = function() {
    this.player_character.x++;
  };

  world.move_char_left = function() {
    this.player_character.x--;
  };

  world.move_char_up = function() {
    this.player_character.y--;
  };

  world.move_char_down = function() {
    this.player_character.y++;
  };

  return world;
})();