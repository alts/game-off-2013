(function(){
  return [
    {
      title: 'NEEDS FOOD',
      objs: [
        ['~wizard', 2, 3],
        ['~food', 7, 2]
      ],
      win: function(world) {
        return world.wizard.ate_food;
      }
    }
  ];
})();