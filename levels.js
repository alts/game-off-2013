(function(){
  var starter_walls = [
        9, 5, 4, 0,
        8, 5, 0, 5,
        8, 11, 5, 0,
        14, 5, 0, 6,
      ],
      standard_walls = [
        1, 1, 22, 0,
        1, 2, 0, 12,
        2, 14, 21, 0,
        23, 2, 0, 11
      ];

  return [
    {
      title: 'NEEDS FOOD',
      objs: [
        ['~wizard', 10, 10],
        ['~food', 11, 6]
      ],
      walls: starter_walls,
      win: function(world) {
        return world.player_character.num_consumed('~food') == 1;
      }
    },

    {
      title: 'NEEDS FOOD BADLY',
      objs: [
        ['~wizard', 10, 10],
        ['~food', 11, 6],
        ['~doodad', 13, 8, 'chair.png']
      ],
      walls: starter_walls,
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
    },

    {
      title: 'NEEDS TO REPAIR THE VASE',
      objs: [
        ['~wizard', 2, 3],
        ['~doodad', 6, 2, 'vase.png'],
        ['~doodad', 18, 2, 'broken_vase.png']
      ],
      walls: [
        1, 1, 22, 0,
        1, 2, 0, 12,
        2, 14, 21, 0,
        23, 2, 0, 11,
        11, 2, 2, 4,
        11, 9, 2, 4
      ],
      win: function(world) {
        var objs = world.objects,
            obj;

        // ensure no broken vases
        for (var i = 0, l = objs.length; i < l; i++) {
          obj = objs[i];
          if (obj.type == '~doodad' && obj.image == 'broken_vase.png') {
            return false;
          }
        }

        // a non-broken vase should be at the
        // original position of the broken one
        for (var i = 0, l = objs.length; i < l; i++) {
          obj = objs[i];
          if (obj.type == '~doodad' &&
              obj.x == 18 && obj.y == 2 &&
              obj.image == 'vase.png')
          {
            return true;
          }
        }

        return false;
      }
    },

    {
      title: 'NEEDS TO SORT THE CARDS',
      objs: [
        ['~wizard', 10, 7],
        ['~doodad', 11, 7, 'card_three.png'],
        ['~doodad', 12, 7, 'card_four.png'],
        ['~doodad', 13, 7, 'card_one.png'],
        ['~doodad', 14, 7, 'card_two.png'],
      ],
      walls: [
        7, 3, 10, 0,
        7, 4, 0, 7,
        8, 11, 9, 0,
        17, 4, 0, 6
      ],
      win: function(world) {
        var might_be_ascending = true,
            might_be_descending = true;

        for (var i = 0, l = world.objects.length; i < l; i++) {
          obj = world.objects[i];
          if (obj.y == 7 &&
              obj.x > 10 &&
              obj.x < 15)
          {
            if (obj.type != '~doodad') {
              return false;
            }

            if (obj.image == 'card_one.png') {
              if (obj.x == 11) {
                might_be_ascending = might_be_ascending && true;
                might_be_descending = false;
              } else if (obj.x == 14) {
                might_be_ascending = false
                might_be_descending = might_be_descending && true;
              } else {
                return false;
              }
            }

            if (obj.image == 'card_two.png') {
              if (obj.x == 12) {
                might_be_ascending = might_be_ascending && true;
                might_be_descending = false;
              } else if (obj.x == 13) {
                might_be_ascending = false
                might_be_descending = might_be_descending && true;
              } else {
                return false;
              }
            }

            if (obj.image == 'card_three.png') {
              if (obj.x == 13) {
                might_be_ascending = might_be_ascending && true;
                might_be_descending = false;
              } else if (obj.x == 12) {
                might_be_ascending = false
                might_be_descending = might_be_descending && true;
              } else {
                return false;
              }
            }

            if (obj.image == 'card_four.png') {
              if (obj.x == 14) {
                might_be_ascending = might_be_ascending && true;
                might_be_descending = false;
              } else if (obj.x == 11) {
                might_be_ascending = false
                might_be_descending = might_be_descending && true;
              } else {
                return false;
              }
            }
          }
        }

        return might_be_ascending || might_be_descending
      }
    },

    {
      title: 'NEEDS TO HIDE THE EVIDENCE',
      objs: [
        ['~wizard', 10, 7],
        ['~doodad', 16, 4, 'body.png'],
        ['~doodad', 15, 4, 'bloody_knife.png'],
        ['~doodad', 14, 4, 'chair.png'],
        ['~crate', 14, 5],
        ['~crate', 15, 5],
        ['~crate', 16, 5]
      ],
      walls: [
        7, 3, 10, 0,
        7, 4, 0, 7,
        8, 11, 9, 0,
        17, 4, 0, 6
      ],
      win: function(world) {
        var obj;
        for (var i = 0, l = world.objects.length; i < l; i++) {
          obj = world.objects[i];
          if ((obj.x == 14 && obj.y == 4) ||
              (obj.x == 14 && obj.y == 5) ||
              (obj.x == 15 && obj.y == 5) ||
              (obj.x == 16 && obj.y == 5))
          {
            if (obj.type != '~wall') {
              return false;
            }
          }
        }

        return true;
      }
    },

    {
      title: 'NEEDS TO LIGHT THE LANTERN',
      objs: [
        ['~wizard', 11, 10],
        ['~crate', 11, 8],
        ['~wall', 8, 8],
        ['~doodad', 7, 8, 'unlit_lantern.png'],
        ['~doodad', 14, 8, 'lit_lantern.png']
      ],
      win: function(world){
        var obj;
        for (var i = 0, l = world.objects.length; i < l; i++) {
          obj = world.objects[i];
          if (obj.x == 7 &&
              obj.y == 8 &&
              obj.type == '~doodad' &
              obj.image == 'lit_lantern.png')
          {
            return true;
          }
        }
        return false;
      }
    },

    {
      title: 'NEEDS TO DO SOMETHING',
      objs: [
        ['~wizard', 11, 7],
        ['~crate', 9, 9],
        ['~crate', 13, 9],
        ['~crate', 9, 13],
        ['~crate', 13, 13]
      ],
      walls: [
        10, 8, 2, 0,
        10, 10, 2, 2,
        6, 8, 2, 0,
        6, 10, 2, 2,
        14, 8, 2, 0,
        14, 10, 2, 2,
        10, 14, 2, 2,
        6, 14, 2, 2,
        14, 14, 2, 2
      ],
      win: function(){}
    }
  ];
})();