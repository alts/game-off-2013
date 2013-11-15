(function(){
  var standard_walls = [
    1, 1, 22, 0,
    1, 2, 0, 12,
    2, 14, 21, 0,
    23, 2, 0, 11
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
    },

    {
      title: 'NEEDS SOME FRESH AIR',
      objs: [
        ['~wizard', 2, 3],
        ['~food', 7, 2]
      ],
      walls: standard_walls,
      win: function(world) {
        var player = world.player_character;
        return (player.x == 0 || player.x == 24 ||
                player.y == 0 || player.y == 15);
      }
    }
  ];
})();