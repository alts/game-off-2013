(function(){
  return [
    {
      title: 'NEEDS FOOD',
      objs: [
        ['~wizard', 2, 3],
        ['~food', 7, 2],
        ['~wall', 1, 3]
      ],
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
      win: function(world) {
        return world.player_character.num_consumed('~food') > 1;
      }
    }
  ];
})();