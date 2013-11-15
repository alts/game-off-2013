(function(){
  var standard_walls = [
    1, 1, 22, 0,
    1, 2, 0, 14,
    2, 16, 21, 0,
    23, 2, 0, 13
  ];

  return [
    {
      title: 'NEEDS FOOD',
      objs: [
        ['~wizard', 2, 3],
        ['~food', 7, 2],
        ['~wall', 1, 3]
      ],
      walls: standard_walls,
      win: function(world) {
        return world.player_character.num_consumed('~food') == 1;
      }
    },

    {
      title: 'NEEDS FOOD BADLY',
      objs: [
        ['~wizard', 2, 3],
        ['~food', 7, 2],
        ['~doodad', 10, 4, '~chair']
      ],
      walls: standard_walls,
      win: function(world) {
        return world.player_character.num_consumed('~food') > 1;
      }
    }
  ];
})();