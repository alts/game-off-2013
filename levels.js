(function(){
  return [
    {
      title: 'NEEDS FOOD',
      objs: [
        ['~wizard', 2, 3]
      ],
      win: function(world) {
        return world.wizard.ate_food;
      }
    }
  ];
})();