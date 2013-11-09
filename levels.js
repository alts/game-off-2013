(function(){
  return [
    {
      title: 'NEEDS FOOD',
      objs: [
        ['~wizard', 2, 3],
        ['~food', 7, 2]
      ],
      win: function(world) {
        return world.player_character.num_consumed('~food') == 1;
      }
    }
  ];
})();