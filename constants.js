(function() {
  var SCREEN_WIDTH = 800,
      SCREEN_HEIGHT = 600,
      COLUMN_COUNT = 25,
      ROW_COUNT = 17,
      UNIT_SIZE = SCREEN_WIDTH / 25,
      BUFFER_HEIGHT = UNIT_SIZE,
      TEXT_AREA_HEIGHT = SCREEN_HEIGHT - ROW_COUNT * UNIT_SIZE;

  return {
    SCREEN_WIDTH: SCREEN_WIDTH,
    SCREEN_HEIGHT: SCREEN_HEIGHT,
    UNIT_SIZE: UNIT_SIZE,
    BUFFER_HEIGHT: BUFFER_HEIGHT,
    // keys
    K_UP: 38,
    K_DOWN: 40,
    K_LEFT: 37,
    K_RIGHT: 39,

    K_SPACE: 32
  };
})();