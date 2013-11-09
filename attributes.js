(function(){
  var attributes = {};

  // collisions
  attributes.fixed = function(other, dx, dy, world_objects){
    // other object doesn't move, nor self
    return false;
  };

  attributes.pushable = function(other, dx, dy, world_objects){
    var tx = this.x + dx,
        ty = this.y + dy,
        obj;

    for (var i = 0, l = world_objects.length; i < l; i++) {
      obj = world_objects[i];
      if (obj.x == tx && obj.y == ty) {
        // can't push object because blocked
        return false;
      }
    }

    this.x += dx;
    this.y += dy;
    return true;
  };

  attributes.consumable = function(player, dx, dy, world_objects) {
    this.dead = true;
    player.consume(this.type);
    return true;
  };

  return attributes;
})();