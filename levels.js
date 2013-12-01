(function(){
  var starter_walls = [
        10, 5, 4, 0,
        9, 5, 0, 5,
        9, 11, 5, 0,
        15, 5, 0, 6,
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
        ['~wizard', 11, 10],
        ['~food', 12, 6]
      ],
      walls: starter_walls,
      win: function(world) {
        return world.player_characters[0].num_consumed('~food') == 1;
      },
      submessages: [
        'USE ARROW KEYS TO MOVE',
        function(world) { return true; }
      ]
    },

    {
      title: 'NEEDS FOOD BADLY',
      objs: [
        ['~wizard', 12, 10],
        ['~food', 12, 6],
        ['~doodad', 14, 8, 'chair_right.png']
      ],
      walls: starter_walls,
      win: function(world) {
        return world.player_characters[0].num_consumed('~food') > 1;
      },
      submessages: [
        'THIS IS ENOUGH APPLES   EAT THEM',
        function(world) {
          var num_foods = 0;
          for (var i = 0, l = world.objects.length; i < l; i++) {
            if (world.objects[i].type == '~food') {
              num_foods++;
            }
          }
          return (num_foods + world.player_characters[0].num_consumed('~food') > 1);
        },
        'ONE APPLE IS NOT ENOUGH   [R] TO RESTART',
        function(world) {
          var num_foods = 0;
          for (var i = 0, l = world.objects.length; i < l; i++) {
            if (world.objects[i].type == '~food') {
              num_foods++;
            }
          }
          return (num_foods == 0 &&
                  world.player_characters[0].num_consumed('~food') > 0);
        },
        'NO MORE APPLES   [R] TO RESTART',
        function(world) {
          var num_foods = 0;
          for (var i = 0, l = world.objects.length; i < l; i++) {
            if (world.objects[i].type == '~food') {
              num_foods++;
            }
          }
          return num_foods == 0;
        },
        'SELECT ANOTHER TARGET WITH THE ARROW KEYS',
        function(world) {
          return (world.player_characters[0].is_casting &&
                  world.highlighted_targets);
        },
        'SELECT A TARGET WITH THE ARROW KEYS',
        function(world) {
          return world.player_characters[0].is_casting;
        },
        'START CASTING MAGIC BY PRESSING [SPACE]',
        function(world) { return true; }
      ]
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
        ['~doodad', 16, 4, 'corpse.png'],
        ['~doodad', 15, 4, 'weapon.png'],
        ['~doodad', 14, 4, 'chair_down.png'],
        ['~doodad', 14, 5, 'chair_right.png'],
        ['~doodad', 15, 5, 'table.png'],
        ['~doodad', 16, 5, 'chair_left.png']
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
      },
      submessages: [
        'THEY CANT FIND WHAT THEY CANT SEE',
        function() { return true; }
      ]
    },

    {
      title: 'NEEDS TO LIGHT THE LANTERN',
      objs: [
        ['~wizard', 12, 10],
        ['~crate', 13, 8],
        ['~wall', 9, 8],
        ['~doodad', 8, 8, 'unlit_lantern.png'],
        ['~doodad', 16, 8, 'lit_lantern.png']
      ],
      win: function(world){
        var obj;
        for (var i = 0, l = world.objects.length; i < l; i++) {
          obj = world.objects[i];
          if (obj.x == 8 &&
              obj.y == 8 &&
              obj.type == '~doodad' &
              obj.image == 'lit_lantern.png')
          {
            return true;
          }
        }
        return false;
      },
      submessages: [
        'CRATES CAN BE PUSHED',
        function(){ return true; }
      ]
    },

    {
      title: 'NEEDS TO LIGHT THE LANTERN OUTSIDE',
      objs: [
        ['~wizard', 9, 9],
        ['~crate', 11, 9],
        ['~crate', 13, 9],
        ['~doodad', 11, 8, 'lit_lantern.png'],
        ['~doodad', 6, 9, 'unlit_lantern.png']
      ],
      walls: [
        9, 7, 1, 1,
        7, 7, 1, 4,
        9, 10, 9, 1,
        11, 7, 0, 0,
        12, 7, 2, 1,
        16, 7, 1, 1,
        18, 7, 0, 2,
        15, 7, 0, 0
      ],
      win: function(world){
        var obj;
        for (var i = 0, l = world.objects.length; i < l; i++) {
          obj = world.objects[i];
          if (obj.x == 6 &&
              obj.y == 9 &&
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
      title: 'NEEDS TO FIND THEIR OLD KEY',
      objs: [
        ['~wizard', 12, 2],
        ['~crate', 12, 7],
        ['~key', 12, 13]
      ],
      walls: [
        11, 1, 2, 0,
        11, 2, 0, 11,
        13, 2, 0, 11,
        11, 14, 2, 0
      ],
      win: function(world) {
        return world.player_characters[0].num_consumed('~key') == 1;
      }
    },

    {
      title: 'NEEDS TO GET RID OF THE TRASH',
      objs: [
        ['~wizard', 12, 7],
        ['~door', 10, 9],
        ['~doodad', 8, 6, 'trash.png'],
        ['~doodad', 16, 6, 'trash.png']
      ],
      walls: [
        6, 4, 12, 0,
        6, 13, 12, 0,
        10, 5, 0, 3,
        10, 10, 0, 2,
        14, 5, 0, 7,
        6, 5, 0, 7,
        18, 5, 0, 7
      ],
      win: function(world){
        var obj;
        for (var i = 0, l = world.objects.length; i < l; i++) {
          obj = world.objects[i];
          if (obj.type == '~doodad') {
            return false;
          }
        }
        return true;
      },
      submessages: [
        'OBSERVE THE DOORS',
        function () { return true; }
      ]
    },

    {
      title: 'NEEDS TO GET RID OF MORE TRASH',
      objs: [
        ['~wizard', 12, 7],
        ['~door', 10, 9],
        ['~doodad', 8, 2, 'trash.png'],
        ['~doodad', 16, 2, 'trash.png']
      ],
      walls: [
        6, 4, 12, 0,
        6, 13, 12, 0,
        10, 5, 0, 3,
        10, 10, 0, 2,
        14, 5, 0, 7,
        6, 5, 0, 7,
        18, 5, 0, 7,
        6, 1, 4, 0,
        6, 2, 0, 1,
        10, 2, 0, 1,
        11, 1, 2, 2,
        14, 1, 4, 0,
        14, 2, 0, 1,
        18, 2, 0, 1
      ],
      win: function(world){
        var obj;
        for (var i = 0, l = world.objects.length; i < l; i++) {
          obj = world.objects[i];
          if (obj.type == '~doodad') {
            return false;
          }
        }
        return true;
      }
    },

    {
      title: "NEEDS TO MOVE OUT OF THEIR PARENTS HOUSE",
      objs: [
        ['~wizard', 13, 7],
        ['~door', 14, 7],
        ['~crate', 16, 12],
        ['~wizard', 18, 1],
        ['~wizard', 19, 1]
      ],
      walls: [
        10, 0, 2, 15,
        14, 0, 0, 6,
        14, 8, 0, 7,
        5, 6, 1, 0,
        5, 7, 0, 1,
        6, 8, 0, 0
      ],
      win: function(world){
        if (world.player_characters[0].x >= 10) {
          return false;
        }
        var obj;
        for (var i = 0, l = world.objects.length; i < l; i++) {
          obj = world.objects[i];
          if (obj.type == '~crate' && obj.x < 10) {
            return true;
          }
        }
        return false;
      },
      submessages: [
        'PRETEND THAT THAT CRATE IS LUGGAGE AND THAT THE CAR IS ON THE LEFT',
        function () { return true; }
      ]
    },

    {
      title: 'NEEDS TO ELIMINATE THE CLONES',
      objs: [
        ['~wizard', 11, 6],
        ['~wizard', 13, 8],
        ['~wizard', 13, 6],
        ['~wizard', 11, 8]
      ],
      controllables: 3,
      walls: [
        7, 4, 10, 0,
        7, 5, 0, 5,
        8, 10, 9, 0,
        17, 5, 0, 4
      ],
      win: function(world){
        return world.player_characters.length == 1;
      }
    },

    {
      title: 'NEEDS TO UNDO A HUGE MISTAKE',
      objs: [
        ['~wizard', 12, 7, 'apple.png'],
        ['~mirror', 10, 5],
        ['~wizard', 16, 5]
      ],
      walls: [
        7, 4, 10, 0,
        7, 5, 0, 5,
        8, 10, 9, 0,
        17, 5, 0, 4
      ],
      win: function(world){
        return (world.player_characters.length == 1 &&
                world.player_characters[0].special_image == null);
      }
    },

    {
      title: 'NEEDS FRIENDS',
      objs: [
        ['~wizard', 11, 7],
        ['~mirror', 9, 5],
        ['~doodad', 14, 7, 'cake.png'],
        ['~doodad', 13, 7, 'chair_right.png'],
        ['~doodad', 15, 7, 'chair_left.png'],
        ['~doodad', 14, 6, 'chair_down.png']
      ],
      walls: [
        7, 4, 10, 0,
        7, 5, 0, 5,
        8, 10, 9, 0,
        17, 5, 0, 4
      ],
      win: function(world){
        if (world.player_characters.length > 3) {
          return true;
        }

        return (world.player_characters.length == 1 &&
                world.player_characters[0].special_image &&
                world.player_characters[0].special_image.substring(0, 5) == 'chair' &&
                world.player_characters[0].x == 14 &&
                world.player_characters[0].y == 8);
      }
    },

    {
      title: 'NEEDS TO ESCAPE THIS TOMB',
      objs: [
        ['~wizard', 10, 6],
        ['~wizard', 12, 8]
      ],
      controllables: 1,
      walls: [
        5, 3, 12, 1,
        5, 5, 1, 6,
        7, 10, 10, 1,
        16, 5, 1, 4
      ],
      win: function(world){
        var caster;
        for (var i = 0, l = world.player_characters.length; i < l; i++) {
          caster = world.player_characters[i];
          if (caster.x < 5 ||
              caster.x > 16 ||
              caster.y < 3 ||
              caster.y > 10)
          {
            return true;
          }
        }
        return false;
      }
    },
    {
      title: 'IS CONTENT',
      objs: [
        ['~wizard', 12, 7]
      ],
      walls: [],
      win: function(){},
      submessages: [
        'THANKS FOR PLAYING',
        function () {return true;}
      ]
    }
  ];
})();