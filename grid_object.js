(function(){
  var grid_object = {},
      C = require('constants.js');

  grid_object.init_from_repr = function(repr) {
    this.x = repr[1];
    this.y = repr[2];
  };

  grid_object.true_x = function() {
    return this.x * C.UNIT_SIZE;
  };

  grid_object.true_y = function() {
    return C.BUFFER_HEIGHT + this.y * C.UNIT_SIZE;
  };

  return grid_object;
})();