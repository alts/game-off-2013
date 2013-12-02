var _v_bb618078c0f0dd83dc8b3348758912a6 = (function(){
  var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

  window.requestAnimationFrame = requestAnimationFrame;

  var noop = function(){};

  var events = [
      "onabort",
      "onafterprint",
      "onafterscriptexecute",
      "onbeforeprint",
      "onbeforescriptexecute",
      "onbeforeunload",
      "onblur",
      "oncanplay",
      "oncanplaythrough",
      "onchange",
      "onclick",
      "oncontextmenu",
      "oncopy",
      "oncut",
      "ondblclick",
      "ondevicelight",
      "ondevicemotion",
      "ondeviceorientation",
      "ondeviceproximity",
      "ondrag",
      "ondragend",
      "ondragenter",
      "ondragleave",
      "ondragover",
      "ondragstart",
      "ondrop",
      "ondurationchange",
      "onemptied",
      "onended",
      "onerror",
      "onfocus",
      "onhashchange",
      "oninput",
      "oninvalid",
      "onkeydown",
      "onkeypress",
      "onkeyup",
      "onload",
      "onloadeddata",
      "onloadedmetadata",
      "onloadstart",
      "onmessage",
      "onmousedown",
      "onmouseenter",
      "onmouseleave",
      "onmousemove",
      "onmouseout",
      "onmouseover",
      "onmouseup",
      //"onmozfullscreenchange",
      //"onmozfullscreenerror",
      //"onmozpointerlockchange",
      //"onmozpointerlockerror",
      "onoffline",
      "ononline",
      "onpagehide",
      "onpageshow",
      "onpaste",
      "onpause",
      "onplay",
      "onplaying",
      "onpopstate",
      "onprogress",
      "onratechange",
      "onreset",
      "onresize",
      "onscroll",
      "onseeked",
      "onseeking",
      "onselect",
      "onshow",
      "onstalled",
      "onsubmit",
      "onsuspend",
      "ontimeupdate",
      "onunload",
      "onuserproximity",
      "onvolumechange",
      "onwaiting",
      "onwheel"
  ];

  var jerk = {
    listeners: {}
  };

  jerk.begin = function(canvas_node, scene) {
    this.scene = scene;
    this.scene.enter(null);
    this.ctx = canvas_node.getContext('2d');
    this.running = true;
    this.eventHooks = {};

    this.start();
  };


  jerk.start = function() {
    var start = Date.now(),
        that = this;

    function step(time) {
      if (that.running) {
        var dt = time - start;
        that.update(dt);
        that.draw()
        requestAnimationFrame(step);
        start = time;
      }
    };

    requestAnimationFrame(step);
  };


  jerk.update = function(dt) {
    if (this.scene) {
      this.scene.update(dt);
    }
  };


  jerk.draw = function() {
    if (this.scene) {
      this.scene.draw();
    }
  };


  jerk.togglePause = function() {
    this.running = !this.running;
    if (this.running) {
      this.start();
    }
  };


  jerk.createListener = function(eventname) {
    var that = this;
    return function(e) {
      var hooks = that.eventHooks[eventname];

      if (hooks) {
        for (var i = 0, l = hooks.length; i < l; i++) {
          hooks[i](e);
        }
      }

      if (that.scene && that.scene[eventname]) {
        that.scene[eventname](e);
      }

      e.preventDefault();
    };
  };


  jerk.registerScenes = function(scenes) {
    var activeEvents = [],
        event, scene;

    for (var i = 0, l = events.length; i < l; i++) {
      event = events[i];

      for (var j = 0, ll = scenes.length; j < ll; j++) {
        scene = scenes[j];

        if (scene[event] && scene[event] !== noop) {
          activeEvents.push(event);
          break;
        }
      }
    }

    for (var i = 0, l = activeEvents.length; i < l; i++) {
      event = activeEvents[i];

      this.listeners[event] = this.createListener(event);

      document.body.addEventListener(
        event.substring(2), // remove "on" from event name
        this.listeners[event]
      );
    }
  };

  jerk.switchScene = function(to) {
    this.scene.exit(to);
    to.enter(this.scene);
    this.scene = to;
  };


  var scene = {};

  scene.init = noop;
  scene.draw = noop;
  scene.update = noop;
  scene.enter = noop;
  scene.exit = noop;

  jerk.scene = scene

  return jerk;
})();
var _v_4f56deb9c6452b7febdaa365d9243ab0 = (function() {
  var load_image = function(path) {
    var d = document.createElement('img');
    d.src = path;
    return d;
  };

  var wizards = load_image('wizards2.png'),
      cards   = load_image('cards.png'),
      vases   = load_image('vases.png'),
      crime   = load_image('crime.png'),
      chairs  = load_image('chair.png'),
      lantern = load_image('lantern.png'),
      cake    = load_image('cake.png'),
      door    = load_image('door.png'),
      poof    = load_image('poof.png');

  return {
    draw: function (ctx, path, x, y, frame) {
      if (frame != null) {
        path = path + '#' + frame;
      }
      var image_data = this[path];

      if (!image_data) {
        return false;
      }

      ctx.drawImage(
        image_data[0],
        image_data[1], image_data[2],
        32, 32,
        x, y,
        32, 32
      );

      return true;
    },

    'apple.png': [load_image('apple.png'), 0, 0],
    'card_one.png': [cards, 0, 0],
    'card_two.png': [cards, 32, 0],
    'card_three.png': [cards, 64, 0],
    'card_four.png': [cards, 96, 0],
    'wizards2.png#0': [wizards, 0, 0],
    'wizards2.png#1': [wizards, 32, 0],
    'crate.png': [load_image('crate.png'), 0, 0],
    'vase.png': [vases, 0, 0],
    'broken_vase.png': [vases, 32, 0],
    // half width
    'wand_normal.png': [wizards, 64, 0],
    'wand_raised.png': [wizards, 80, 0],
    'corpse.png': [crime, 0, 0],
    'weapon.png': [crime, 32, 0],
    'wall.png': [load_image('wall.png'), 0, 0],
    'poof.png#0': [poof, 0, 0],
    'poof.png#1': [poof, 32, 0],
    'poof.png#2': [poof, 64, 0],
    'chair_right.png': [chairs, 0, 0],
    'chair_down.png': [chairs, 32, 0],
    'chair_left.png': [chairs, 64, 0],
    'unlit_lantern.png': [lantern, 0, 0],
    'lit_lantern.png': [lantern, 32, 0],
    'key.png': [load_image('key.png'), 0, 0],
    'table.png': [cake, 0, 0],
    'cake.png': [cake, 32, 0],
    'open_door.png': [door, 0, 0],
    'closed_door.png': [door, 32, 0],
    'mirror.png': [load_image('mirror.png'), 0, 0],
    'trash.png': [load_image('trash.png'), 0, 0]
  };
})();
var _v_88903d9c789529ef76d3636ebafcdb40 = (function() {
  var SCREEN_WIDTH = 800,
      SCREEN_HEIGHT = 600,
      COLUMN_COUNT = 25,
      ROW_COUNT = 17,
      UNIT_SIZE = SCREEN_WIDTH / 25,
      BUFFER_HEIGHT = UNIT_SIZE,
      TEXT_AREA_HEIGHT = SCREEN_HEIGHT - ROW_COUNT * UNIT_SIZE,
      TEXT_AREA_Y = UNIT_SIZE * ROW_COUNT;

  return {
    SCREEN_WIDTH: SCREEN_WIDTH,
    SCREEN_HEIGHT: SCREEN_HEIGHT,
    UNIT_SIZE: UNIT_SIZE,
    BUFFER_HEIGHT: BUFFER_HEIGHT,
    TEXT_AREA_HEIGHT: TEXT_AREA_HEIGHT,
    TEXT_AREA_Y: TEXT_AREA_Y,

    COLUMN_COUNT: COLUMN_COUNT,
    ROW_COUNT:ROW_COUNT,

    // keys
    K_UP: 38,
    K_DOWN: 40,
    K_LEFT: 37,
    K_RIGHT: 39,
    K_R: 82,

    K_SPACE: 32,
    //directions
    D_LEFT: 0,
    D_UP: 1,
    D_RIGHT: 2,
    D_DOWN: 3
  };
})();
var _v_99408439b06670b1565af8246f9ad9df = (function(){
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
      },
      submessages: [
        'MIRRORS REFLECT MAGIC',
        function() {return true;}
      ]
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
var _v_adb6dcd9565aabb59fa1fc3dc840bfe2 = (function(){
  var progress = {},
      levels = _v_99408439b06670b1565af8246f9ad9df;

  progress.level_count = levels.length;
  progress.current_level = 0;
  progress.accessible_level = 0;

  progress.next_level = function() {
    if (this.current_level == this.accessible_level) {
      this.accessible_level++;
    }
    this.current_level++;
  };

  progress.select_level = function(level_i) {
    if (level_i >= 0 && level_i <= this.accessible_level) {
      this.current_level = level_i;
      return true;
    }
    return false;
  };

  return progress;
})();
var _v_345411057b2cd0ba9de4cb42274ff600 = (function(){
  var jerk       = _v_bb618078c0f0dd83dc8b3348758912a6,
      images     = _v_4f56deb9c6452b7febdaa365d9243ab0,
      image_font = {};

  var load_image = function(path) {
    var d = document.createElement('img');
    d.src = path;
    return d;
  };

  image_font.image = load_image('font.gif');
  image_font.height = 8;
  image_font.width = 8;

  image_font.letters = {
    // letter: x, y
    ' ': [8, 8],
    '[': [88, 40],
    ']': [104, 40],
    'A': [8, 32],
    'B': [16, 32],
    'C': [24, 32],
    'D': [32, 32],
    'E': [40, 32],
    'F': [48, 32],
    'G': [56, 32],
    'H': [64, 32],
    'I': [72, 32],
    'J': [80, 32],
    'K': [88, 32],
    'L': [96, 32],
    'M': [104, 32],
    'N': [112, 32],
    'O': [120, 32],
    'P': [0, 40],
    'Q': [8, 40],
    'R': [16, 40],
    'S': [24, 40],
    'T': [32, 40],
    'U': [40, 40],
    'V': [48, 40],
    'W': [56, 40],
    'X': [64, 40],
    'Y': [72, 40],
    'Z': [80, 40]
  };

  image_font.print = function (text, x, y) {
    var ctx = jerk.ctx,
        char_info;

    for (var i = 0, l = text.length; i < l; i++) {
      char_info = this.letters[text[i]];
      ctx.drawImage(
        this.image,
        char_info[0], char_info[1],
        this.width, this.height,
        x, y,
        this.width, this.height
      );

      x += this.width;
    }
  };

  image_font.print_centered = function (text, x, y) {
    var width = 0,
        char_info;

    for (var i = 0, l = text.length; i < l; i++) {
      width += this.width;
    }

    return this.print(text, x - width/2, y);
  };

  return image_font;
})();
var _v_6d9d44b68ce2b956e68cd318cbcceb4e = (function(){
  var image_font = _v_345411057b2cd0ba9de4cb42274ff600,
      C          = _v_88903d9c789529ef76d3636ebafcdb40,
      submessage = {};

  submessage.print = function(text) {
    return image_font.print_centered(
      text,
      C.SCREEN_WIDTH / 2, C.TEXT_AREA_Y + 10
    );
  };

  return submessage;
})();
var _v_4db9ecc8c3ccb1508300250d17c60025 = (function(){
  var jerk        = _v_bb618078c0f0dd83dc8b3348758912a6,
      C           = _v_88903d9c789529ef76d3636ebafcdb40,
      enchantment = {};

  enchantment._timer_to_color = function(timer) {
    var c = timer;
    if (c < 255) {
      return 'rgb(' + Math.floor(255 - c) + ',' + Math.floor(c) + ', 0)';
    }
    c -= 255;
    if (c < 255) {
      return 'rgb(0, ' + Math.floor(255 - c) + ',' + Math.floor(c) + ')';
    }
    c -= 255;
    return 'rgb(' + Math.floor(c) + ', 0, ' + Math.floor(255 - c) + ')';
  };

  enchantment.draw_for_obj = function (obj, timer) {
    var ctx = jerk.ctx,
        x = obj.true_x(),
        y = obj.true_y(),
        line_unit = C.UNIT_SIZE / 3;

    ctx.strokeStyle = this._timer_to_color(timer);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + line_unit, y);
    ctx.moveTo(x + line_unit * 2, y);
    ctx.lineTo(x + C.UNIT_SIZE, y);
    ctx.lineTo(x + C.UNIT_SIZE, y + line_unit);
    ctx.moveTo(x + C.UNIT_SIZE, y + 2 * line_unit);
    ctx.lineTo(x + C.UNIT_SIZE, y + C.UNIT_SIZE);
    ctx.lineTo(x + line_unit * 2, y + C.UNIT_SIZE);
    ctx.moveTo(x + line_unit, y + C.UNIT_SIZE);
    ctx.lineTo(x, y + C.UNIT_SIZE);
    ctx.lineTo(x, y + 2 * line_unit);
    ctx.moveTo(x, y + line_unit);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  return enchantment;
})();
var _v_d33dac296acfee4e8314a43bc30f90b2 = (function(){
  var jerk   = _v_bb618078c0f0dd83dc8b3348758912a6,
      images = _v_4f56deb9c6452b7febdaa365d9243ab0,
      poof   = {};

  poof.draw_at = function(x, y, stage) {
    images.draw(jerk.ctx, 'poof.png', x, y, stage);
  };

  return poof;
})();
var _v_3fdb77ba8315d78457c04c2e26877a7e = (function() {
  var load_source = function(path) {
    var d = document.createElement('audio');
    if (!d) {
      return null;
    }
    d.src = path;
    d.volume = 0.5;
    return d;
  };

  return {
    play: function(name) {
      var audio_data = this[name];
      if (audio_data) {
        audio_data.play();
      }
    },
    success: load_source('success.wav'),
    cast_on_source: load_source('cast_on_source2.wav'),
    cast_on_drain: load_source('cast_on_drain.wav')
  };
})();
var _v_4784f9327eb7f5f2d5e1facdd95fbda3 = (function(){
  var submessage  = _v_6d9d44b68ce2b956e68cd318cbcceb4e,
      C           = _v_88903d9c789529ef76d3636ebafcdb40,
      enchantment = _v_4db9ecc8c3ccb1508300250d17c60025,
      poof        = _v_d33dac296acfee4e8314a43bc30f90b2,
      audio       = _v_3fdb77ba8315d78457c04c2e26877a7e,
      world = {};

  world.init = function(title, win_condition) {
    this.objects = [];

    this.title = title;
    this.win_condition = win_condition;
    this.player_characters = [];
    this.highlighted_targets = null;
    this.poofs = null;
    this.did_win = false;
    this.is_casting = false;
  };

  world.add_object = function(obj) {
    this.objects.push(obj);
  };

  world.register_player_character = function(obj) {
    this.player_characters.push(obj);
  };

  world.is_player_character = function(obj) {
    for (var i = 0, l = this.player_characters.length; i < l; i++) {
      if (obj == this.player_characters[i]) {
        return true;
      }
    }
    return false;
  };

  world.draw = function() {
    var obj;
    for (var i = 0, l = this.objects.length; i < l; i++) {
      obj = this.objects[i];
      if (!this.is_player_character(obj)) {
        obj.draw();
      }
    }

    for (var i = 0, l = this.player_characters.length; i < l; i++) {
      this.player_characters[i].draw();
    }

    if (this.is_casting) {
      this.draw_dimming();
    }

    if (this.did_win) {
      submessage.print('[SPACE] TO CONTINUE');
    } else {
      for (var i = 0, l = this.messages.length; i < l; i += 2) {
        if (this.messages[i+1](this)) {
          submessage.print(this.messages[i]);
          break;
        }
      }
    }
  };

  world.draw_enchantments = function(timer) {
    if (!this.highlighted_targets) {
      return;
    }

    for (var i = 0, l = this.highlighted_targets.length; i < l; i++) {
      if (this.highlighted_targets[i]) {
        enchantment.draw_for_obj(this.highlighted_targets[i], timer);
      }
    }
  };

  var _filter_duplicates = function(xs) {
    var res = [],
        val,
        last;

    for (var i = 0, l = xs.length; i < l; i++) {
      val = xs[i];
      if (last !== val) {
        res.push(val);
        last = val;
      }
    }

    return res;
  };

  var _positions_to_boxes = function (xs, ys) {
    var x_boxes = [],
        y_boxes = [],
        last = 0,
        s;

    for (var i = 0, l = xs.length; i < l; i++) {
      s = xs[i];
      if (s != last) {
        x_boxes.push([last, s - last]);
      }
      last = s + 1;
    }

    last = 0;
    for (var i = 0, l = ys.length; i < l; i++) {
      s = ys[i];
      if (s != last) {
        y_boxes.push([last, s - last]);
      }
      last = s + 1;
    }

    return [x_boxes, y_boxes];
  };

  var _numeric_sort = function (a, b) {
    return a - b;
  };

  world.draw_dimming = function() {
    var xs = [],
        ys = [],
        ctx = jerk.ctx,
        caster;

    for (var i = 0, l = this.player_characters.length; i < l; i++) {
      caster = this.player_characters[i];
      xs.push(caster.x);
      ys.push(caster.y);
    }
    xs.push(C.COLUMN_COUNT);
    ys.push(C.ROW_COUNT);

    xs = _filter_duplicates(xs.sort(_numeric_sort));
    ys = _filter_duplicates(ys.sort(_numeric_sort));

    boxes = _positions_to_boxes(xs, ys);
    var x_boxes = boxes[0],
        y_boxes = boxes[1];

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    for (var i = 0, l = x_boxes.length; i < l; i++) {
      for (var j = 0, ll = y_boxes.length; j < ll; j++) {
        ctx.fillRect(
          C.UNIT_SIZE * x_boxes[i][0], C.UNIT_SIZE * y_boxes[j][0] + C.BUFFER_HEIGHT,
          C.UNIT_SIZE * x_boxes[i][1], C.UNIT_SIZE * y_boxes[j][1]
        );
      }
    }
  };

  world.draw_poofs = function() {
    var loc;

    if (this.poofs) {
      if (this.poofs.time && this.poofs.time >= 300) {
        this.poofs = null;
      } else {
        for (var i = 0, l = this.poofs.locations.length; i < l; i++) {
          loc = this.poofs.locations[i];
          poof.draw_at(loc[0], loc[1], Math.floor(this.poofs.time / 100));
        }
      }
    }
  };

  world.satisfies_win_condition = function() {
    return this.win_condition(this);
  };

  world.start_magic = function() {
    for (var i = 0, l = this.player_characters.length; i < l; i++) {
      if (!this.player_characters[i].is_casting) {
        this.player_characters[i].toggle_casting();
      }
    }
    this.is_casting = true;
  };

  world.stop_magic = function() {
    for (var i = 0, l = this.player_characters.length; i < l; i++) {
      if (this.player_characters[i].is_casting) {
        this.player_characters[i].toggle_casting();
      }
    }
    this.highlighted_targets = null;
    this.is_casting = false;
  };

  var between = function(x, a, b) {
    return (x < a && x > b);
  }

  world.find_target = function(caster, direction_index) {
    var distance = 100,
        target = null,
        test_distance,
        enchant_target,
        obj;

    for (var i = 0, l = this.objects.length; i < l; i++) {
      obj = this.objects[i];
      enchant_target = obj.enchant_target(caster, direction_index);
      if (!enchant_target) {
        continue;
      }

      if (direction_index + 1 == caster.compare_position(obj)) {
        test_distance = obj.distance_from(caster, direction_index);
        if (test_distance < distance) {
          distance = test_distance;
          target = enchant_target;
        }
      }
    }

    return target;
  };

  var move_char = function(dx, dy) {
    return function() {
      var move_sorted = this.player_characters.sort(function(a, b) {
        var ta = dx * a.x + dy * a.y,
            tb = dx * b.x + dy * b.y;

        return tb - ta;
      });
      for (var i = 0, l = move_sorted.length; i < l; i++) {
        (function(that, caster) {
          var tx = caster.x + dx,
              ty = caster.y + dy,
              rollbacks = [],
              valid,
              obj;

          if (tx >= C.COLUMN_COUNT || ty >= C.ROW_COUNT - 1||
              tx < 0 || ty < 0)
          {
            return false;
          }

          for (var i = 0, l = that.objects.length; i < l; i++) {
            obj = that.objects[i];
            if (obj.x == tx && obj.y == ty) {
              valid = obj.on_collide(caster, dx, dy, that.objects);
              rollbacks.push(valid[1]);
              if (!valid[0]) {
                // prevent character position change
                for (var j = 0, ll = rollbacks.length; j < ll; j++) {
                  rollbacks[j]();
                }
                return false;
              }
            }
          }

          for (var i = 0, l = that.objects.length; i < l; i++) {
            obj = that.objects[i];
            if (caster.compare_position(obj) == 0) {
              obj.on_exit(caster, dx, dy, that.objects);
            }
          }

          caster.x = tx;
          caster.y = ty;
        })(this, move_sorted[i]);
      }
      this.on_step();
    };
  };

  world.move_char_right = move_char( 1,  0);
  world.move_char_left  = move_char(-1,  0);
  world.move_char_up    = move_char( 0, -1);
  world.move_char_down  = move_char( 0,  1);

  var cast_magic = function(direction_index) {
    return function() {
      var targets = [],
          any_enchanted = false,
          any_transmuted = false,
          caster;
      for (var i = 0, l = this.player_characters.length; i < l; i++) {
        caster = this.player_characters[i];
        targets.push(this.find_target(caster, direction_index));
      }

      if (this.highlighted_targets) {
        this.poofs = {
          locations: []
        };
        for (var i = 0, l = targets.length; i < l; i++) {
          if (targets[i] && this.highlighted_targets[i]) {
            this.transmute_objects(
              this.highlighted_targets[i],
              targets[i],
              targets[i] == this.player_characters[i]
            );
            this.poofs.locations.push([targets[i].true_x(), targets[i].true_y()]);
            any_transmuted = true;
          } else if (this.highlighted_targets[i] && !targets[i]) {
            this.highlighted_targets[i].dechant();
          }
        }
        this.highlighted_targets = null;
        this.on_step();
        this.stop_magic();
      } else {
        this.highlighted_targets = targets;
        for (var i = 0, l = targets.length; i < l; i++) {
          if (targets[i]) {
            targets[i].enchant();
            any_enchanted = true;
          }
        }
      }

      if (any_transmuted) {
        audio.play('cast_on_drain');
      } else if (any_enchanted) {
        audio.play('cast_on_source');
      }
    }
  };

  world.cast_magic_right = cast_magic(2);
  world.cast_magic_left  = cast_magic(0);
  world.cast_magic_up    = cast_magic(1);
  world.cast_magic_down  = cast_magic(3);

  world.transmute_objects = function (source, drain, did_reflect) {
    source.dechant();

    if (!did_reflect) {
      var copy = Object.create(Object.getPrototypeOf(source));
      copy.init_from_repr(source.to_repr());
      copy.x = drain.x;
      copy.y = drain.y;

      this.add_object(copy);

      if (this.is_player_character(source)) {
        this.register_player_character(copy);
      }

      drain.dead = true;
    } else {
      if (source.type == '~wizard') {
        drain.special_image = source.special_image;
      } else {
        drain.special_image = source.get_image();
      }
    }
    return true;
  };

  world.select_drain = function(target) {
    var to_copy = this.highlighted_targets[0];
    to_copy.dechant();

    var copy = Object.create(Object.getPrototypeOf(to_copy));
    copy.init_from_repr(to_copy.to_repr());
    copy.x = target.x;
    copy.y = target.y;

    this.add_object(copy);
    target.dead = true;

    this.on_step();
    this.start_magic();
    return true;
  };

  world.on_step = function() {
    var obj;

    for (var i = this.objects.length - 1, l = -1; i > l; i--) {
      obj = this.objects[i];
      if (obj.dead) {
        this.objects.splice(i, 1);
      }
    }

    for (var i = this.player_characters.length - 1, l = -1; i > l; i--) {
      obj = this.player_characters[i];
      if (obj.dead) {
        this.player_characters.splice(i, 1);
      }
    }

    if (this.satisfies_win_condition()) {
      this.did_win = true;
      audio.play('success');
    }
  };

  return world;
})();
var _v_5fb6d354ec4f6ac877fe815fd0482a28 = (function() {
  var comparators = {};

  comparators.basic = function (a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1
    }
    return 0;
  };

  comparators.reverse = function (a, b) {
    return comparators.basic(b, a);
  };

  comparators.row_increasing = function (a, b) {
    return comparators.basic(a.x, b.x);
  };

  comparators.row_decreasing = function (a, b) {
    return comparators.reverse(a.x, b.x);
  };

  comparators.col_increasing = function (a, b) {
    return comparators.basic(a.y, b.y);
  };

  comparators.col_decreasing = function (a, b) {
    return comparators.reverse(a.y, b.y);
  }

  return comparators;
})();
var _v_46685311ecac8dac703cc50824020e38 = (function(){
  var attributes = {},
      comparators = _v_5fb6d354ec4f6ac877fe815fd0482a28,
      noop = function(){};

  attributes.standard_collision = function(other, dx, dy, world_objects) {
    return [this.is_passable(), noop];
  };

  attributes.pushable = function(other, dx, dy, world_objects){
    var to_move = [],
        i_limit = 0,
        position_direction,
        comparator,
        key,
        obj;

    if (dx == 1) {
      position_direction = 3;
      comparator = comparators.row_increasing;
      key = 'x';
    } else if (dx == -1) {
      position_direction = 1;
      comparator = comparators.row_decreasing;
      key = 'x';
    } else if (dy == 1) {
      position_direction = 4;
      comparator = comparators.col_increasing;
      key = 'y';
    } else if (dy == -1) {
      position_direction = 2;
      comparator = comparators.col_decreasing;
      key = 'y';
    }


    for (var i = 0, l = world_objects.length; i < l; i++) {
      obj = world_objects[i];
      if (position_direction == other.compare_position(obj)) {
        to_move.push(obj);
      }
    }

    to_move.sort(comparator);
    var s = this[key] - 1;
    for (var i = 0, l = to_move.length; i < l; i++) {
      obj = to_move[i];
      if (!obj.is_passable()) {
        if (Math.abs(obj[key] - s) > 1) {
          break;
        }
        if (!obj.is_pushable) {
          return [false, noop];
        }

        s = obj[key];
      }

      i_limit++;
    }

    for (var i = 0; i < i_limit; i++) {
      if (!to_move[i].is_passable()) {
        to_move[i].x += dx;
        to_move[i].y += dy;
      }
    }

    return [true, function(){
      for (var i = 0; i < i_limit; i++) {
        if (!to_move[i].is_passable()) {
          to_move[i].x -= dx;
          to_move[i].y -= dy;
        }
      }
    }];
  };

  attributes.is_pushable = function(obj) {
    obj.is_pushable = true;
    obj.on_collide = attributes.pushable;
  }

  attributes.consumable = function(player, dx, dy, world_objects) {
    this.dead = true;
    player.consume(this.type);
    return [true, function(){
      this.dead = false;
      player.unconsume(this.type);
    }];
  };

  return attributes;
})();
var _v_b4d46feb76ea1e0cc68160b32785ef76 = (function(){
  var grid_object = {},
      attrs       = _v_46685311ecac8dac703cc50824020e38,
      C           = _v_88903d9c789529ef76d3636ebafcdb40;

  grid_object.init_from_repr = function(repr) {
    this.x = repr[1];
    this.y = repr[2];
    this.dead = false;
    this.glowing = false;
  };

  grid_object.to_repr = function() {
    return [this.type, this.x, this.y];
  };

  grid_object.true_x = function() {
    return this.x * C.UNIT_SIZE;
  };

  grid_object.true_y = function() {
    return C.BUFFER_HEIGHT + this.y * C.UNIT_SIZE;
  };

  grid_object.get_image = function() {
    return this.image;
  };

  grid_object.on_collide = attrs.standard_collision;

  grid_object.on_exit = function(player, dx, dy, objects){};

  grid_object.enchant = function() {
    this.glowing = true;
  };

  grid_object.dechant = function() {
    this.glowing = false;
  };

  // returns the position of the receiver relative to the argument
  // 0 = same position
  // the following four positions map roughly to the indexes for
  //   world.potential_targets
  // 1 = same row, right of
  // 2 = same column, below
  // 3 = same row, left of
  // 4 = same column, above
  //
  // 5 = greater x, lesser y
  // 6 = greater x, greater y
  // 7 = lesser x, greater y
  // 8 = lesser x, lesser y
  grid_object.compare_position = function(other) {
    if (this.x > other.x) {
      if (this.y > other.y) {
        return 6;
      } else if (this.y < other.y) {
        return 5;
      } else {
        return 1;
      }
    } else if (this.x < other.x) {
      if (this.y > other.y) {
        return 7;
      } else if (this.y < other.y) {
        return 8;
      } else {
        return 3;
      }
    } else {
      if (this.y > other.y) {
        return 2;
      } else if (this.y < other.y) {
        return 4;
      } else {
        return 0;
      }
    }
  };

  grid_object.distance_from = function(other, direction) {
    if (direction == 0) {
      return other.x - this.x;
    } else if (direction == 2) {
      return this.x - other.x;
    } else if (direction == 1) {
      return other.y - this.y;
    } else if (direction == 3) {
      return this.y - other.y;
    }
  };

  grid_object.enchant_target = function(caster, direction) {
    // object, by default, are enchantable
    return this;
  };

  grid_object.is_passable = function() {
    return false;
  };

  return grid_object;
})();
var _v_3b1bc7a2fe52b66cc37d7975a857aa10 = (function() {
  var jerk        = _v_bb618078c0f0dd83dc8b3348758912a6,
      C           = _v_88903d9c789529ef76d3636ebafcdb40,
      grid_object = _v_b4d46feb76ea1e0cc68160b32785ef76,
      images      = _v_4f56deb9c6452b7febdaa365d9243ab0,
      wizard = Object.create(grid_object);

  wizard.type = '~wizard';
  wizard.image = 'wizards2.png#0';

  wizard.init_from_repr = function(repr) {
    grid_object.init_from_repr.call(this, repr);
    this.consumed_map = {};
    this.is_casting = false;
    this.special_image = null;
    if (repr.length > 3) {
      this.special_image = repr[3];
    }
  };

  wizard.to_repr = function() {
    var repr = grid_object.to_repr.call(this);
    if (this.special_image) {
      repr.push(this.special_image);
    }
    return repr;
  };

  wizard.draw = function() {
    var ctx = jerk.ctx;

    if (!this.special_image) {
      images.draw(
        ctx,
        'wizards2.png',
        this.true_x(), this.true_y(),
        (this.is_casting) ? '1' : '0'
      );
    } else {
      images.draw(
        ctx,
        this.special_image,
        this.true_x(), this.true_y()
      );

      var wand_img_info;
      if (this.is_casting) {
        wand_img_info = images['wand_raised.png'];
      } else {
        wand_img_info = images['wand_normal.png'];
      }
      ctx.drawImage(
        wand_img_info[0],
        wand_img_info[1], wand_img_info[2],
        16, 32,
        this.true_x(), this.true_y(),
        16, 32
      );
    }
  };

  // player specific
  wizard.consume = function(consumable_type) {
    if (!this.consumed_map[consumable_type]) {
      this.consumed_map[consumable_type] = 0;
    }
    this.consumed_map[consumable_type]++;
  };

  wizard.unconsume = function(consumable_type) {
    if (!this.consumed_map[consumable_type]) {
      return;
    }
    this.consumed_map[consumable_type]--;
  };

  wizard.num_consumed = function(consumable_type) {
    return this.consumed_map[consumable_type] || 0;
  };

  wizard.toggle_casting = function() {
    this.is_casting = !this.is_casting;
    return this.is_casting;
  };

  return wizard;
})();
var _v_e0557c3c5704b931850af76dead6efd9 = (function() {
  var jerk        = _v_bb618078c0f0dd83dc8b3348758912a6,
      C           = _v_88903d9c789529ef76d3636ebafcdb40,
      grid_object = _v_b4d46feb76ea1e0cc68160b32785ef76,
      attrs       = _v_46685311ecac8dac703cc50824020e38,
      images      = _v_4f56deb9c6452b7febdaa365d9243ab0,
      food        = Object.create(grid_object);

  food.type = '~food';
  food.image = 'apple.png';

  food.draw = function() {
    images.draw(
      jerk.ctx,
      this.image,
      this.true_x(), this.true_y()
    );
  };

  food.on_collide = attrs.consumable;

  return food;
})();
var _v_c797d408f7b049c004e49d3f49fa774e = (function() {
  var jerk        = _v_bb618078c0f0dd83dc8b3348758912a6,
      C           = _v_88903d9c789529ef76d3636ebafcdb40,
      grid_object = _v_b4d46feb76ea1e0cc68160b32785ef76,
      attrs       = _v_46685311ecac8dac703cc50824020e38,
      images      = _v_4f56deb9c6452b7febdaa365d9243ab0,
      crate       = Object.create(grid_object);

  crate.type = '~crate';

  crate.draw = function() {
    images.draw(
      jerk.ctx,
      'crate.png',
      this.true_x(), this.true_y()
    );
  };

  attrs.is_pushable(crate);

  return crate;
})();
var _v_6ce34df54cc3537ce7a07a57a1766841 = (function() {
  var jerk        = _v_bb618078c0f0dd83dc8b3348758912a6,
      C           = _v_88903d9c789529ef76d3636ebafcdb40,
      grid_object = _v_b4d46feb76ea1e0cc68160b32785ef76,
      attrs       = _v_46685311ecac8dac703cc50824020e38,
      images      = _v_4f56deb9c6452b7febdaa365d9243ab0,
      doodad      = Object.create(grid_object);


  doodad.type = '~doodad';

  doodad.init_from_repr = function(repr) {
    grid_object.init_from_repr.call(this, repr);
    this.image = repr[3];
  };

  doodad.to_repr = function() {
    var repr = grid_object.to_repr.call(this);
    repr.push(this.image);
    return repr;
  };

  doodad.draw = function() {
    var ctx = jerk.ctx;

    if (!images.draw(jerk.ctx, this.image, this.true_x(), this.true_y())) {
      ctx.fillStyle = '#ff0';
      ctx.fillRect(
        this.true_x(), this.true_y(),
        C.UNIT_SIZE, C.UNIT_SIZE
      );
    }
  };

  return doodad;
})();
var _v_ad14edcadf336bce9ec7c6c5393a9ebd = (function() {
  var jerk        = _v_bb618078c0f0dd83dc8b3348758912a6,
      C           = _v_88903d9c789529ef76d3636ebafcdb40,
      grid_object = _v_b4d46feb76ea1e0cc68160b32785ef76,
      attrs       = _v_46685311ecac8dac703cc50824020e38,
      wall        = Object.create(grid_object);

  wall.type = '~wall';
  wall.image = 'wall.png';

  wall.init_from_repr = function(repr) {
    grid_object.init_from_repr.call(this, repr);
    this.junction = 0;
  };

  wall.form_junction = function(wall_grid) {
  };

  wall.draw = function() {
    images.draw(
      jerk.ctx,
      this.image,
      this.true_x(), this.true_y()
    );
  };

  return wall;
})();
var _v_213406f84317090168e8e26e87efb97a = (function(){
  var jerk        = _v_bb618078c0f0dd83dc8b3348758912a6,
      C           = _v_88903d9c789529ef76d3636ebafcdb40,
      grid_object = _v_b4d46feb76ea1e0cc68160b32785ef76,
      attrs       = _v_46685311ecac8dac703cc50824020e38,
      images      = _v_4f56deb9c6452b7febdaa365d9243ab0,
      key         = Object.create(grid_object);

  key.type = '~key';
  key.image = 'key.png';

  key.draw = function() {
    var ctx = jerk.ctx;

    if (!images.draw(jerk.ctx, this.image, this.true_x(), this.true_y())) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(
        this.true_x(), this.true_y(),
        C.UNIT_SIZE, C.UNIT_SIZE
      );
    }
  };

  key.on_collide = attrs.consumable;

  return key;
})();
var _v_2e06b4fe7d52093a63a16a8e3107908d = (function(){
  var jerk        = _v_bb618078c0f0dd83dc8b3348758912a6,
      C           = _v_88903d9c789529ef76d3636ebafcdb40,
      grid_object = _v_b4d46feb76ea1e0cc68160b32785ef76,
      attrs       = _v_46685311ecac8dac703cc50824020e38,
      images      = _v_4f56deb9c6452b7febdaa365d9243ab0,
      door        = Object.create(grid_object);

  door.type = '~door';

  door.init_from_repr = function (repr) {
    grid_object.init_from_repr.call(this, repr);
    this.is_open = false;
    this.entered_from_direction = -1;
    this.state_after_true_exit = false;
  };

  door.draw = function() {
    var img;

    if (this.is_open) {
      img = 'open_door.png';
    } else {
      img = 'closed_door.png';
    }

    images.draw(jerk.ctx, img, this.true_x(), this.true_y());
  };

  var deltas_to_direction = function (dx, dy) {
    if (dx == 1) {
      return C.D_LEFT;
    } else if (dx == -1) {
      return C.D_RIGHT;
    } else if (dy == 1) {
      return C.D_UP;
    } else if (dy == -1) {
      return C.D_DOWN;
    }
  };

  door.on_collide = function (other, dx, dy, world_objects) {
    var open_state = this.is_open;
    this.state_after_true_exit = !this.is_open;
    this.is_open = true;

    this.entered_from_direction = deltas_to_direction(dx, dy);

    var resp = grid_object.on_collide.call(this, other, dx, dy, world_objects);
    resp[1] = function(){
      this.is_open = open_state;
    };
    return resp;
  };

  door.is_passable = function(){
    return this.is_open;
  };

  door.on_exit = function (other, dx, dy, world_objects) {
    var exit_direction = deltas_to_direction(-dx, -dy);
    if (exit_direction == this.entered_from_direction) {
      // returned from direction entered
      this.is_open = !this.state_after_true_exit;
    } else {
      this.is_open = this.state_after_true_exit;
    }
  };

  door.enchant_target = function () {
    return this.is_open ? null: this;
  };

  return door;
})();
var _v_37552d401afc21ec67f9f96c9b542d76 = (function() {
  var jerk        = _v_bb618078c0f0dd83dc8b3348758912a6,
      C           = _v_88903d9c789529ef76d3636ebafcdb40,
      grid_object = _v_b4d46feb76ea1e0cc68160b32785ef76,
      attrs       = _v_46685311ecac8dac703cc50824020e38,
      images      = _v_4f56deb9c6452b7febdaa365d9243ab0,
      mirror      = Object.create(grid_object);

  mirror.type = '~mirror';

  mirror.draw = function() {
    var ctx = jerk.ctx;

    if (!images.draw(ctx, 'mirror.png', this.true_x(), this.true_y())) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(
        this.true_x(), this.true_y(),
        C.UNIT_SIZE, C.UNIT_SIZE
      );
    }
  };

  mirror.enchant_target = function(caster, direction) {
    return caster;
  };

  return mirror;
})();
var _v_37a1e7ca032d601717527e5fecbdb802 = (function() {
  var jerk        = _v_bb618078c0f0dd83dc8b3348758912a6,
      C           = _v_88903d9c789529ef76d3636ebafcdb40,
      grid_object = _v_b4d46feb76ea1e0cc68160b32785ef76,
      grate = Object.create(grid_object);

  grate.enchant_target = function (caster, direction) {
    return null;
  };

  grate.draw = function() {
    var ctx = jerk.ctx;

    ctx.fillStyle = '#0ff';
    ctx.fillRect(
      this.true_x(), this.true_y(),
      C.UNIT_SIZE, C.UNIT_SIZE
    );
  };

  return grate;
})();
var _v_2800eeb04d6a206430f03fb052b78d1c = (function(){
  var jerk        = _v_bb618078c0f0dd83dc8b3348758912a6,
      C           = _v_88903d9c789529ef76d3636ebafcdb40,
      grid_object = _v_b4d46feb76ea1e0cc68160b32785ef76,
      locked_door = Object.create(grid_object);

  locked_door.on_collide = function (other, dx, dy, world_objects) {
    if (other.num_consumed('~key') > 0) {
      other.unconsume('~key');
      this.dead = true;
      return [true, function(){}];
    }

    return [false, function(){}];
  };

  locked_door.enchant_target = function() {
    return null;
  };

  locked_door.draw = function () {
    var ctx = jerk.ctx;
    ctx.fillStyle = '#950';
    ctx.fillRect(
      this.true_x(), this.true_y(),
      C.UNIT_SIZE, C.UNIT_SIZE
    );
  };

  return locked_door;
})();
var _v_ce4ec09afa71f824ec4ccd8edf4b86c2 = (function(){
  var levels = _v_99408439b06670b1565af8246f9ad9df,
      world  = _v_4784f9327eb7f5f2d5e1facdd95fbda3,
      symbol_map = {
        '~wizard': _v_3b1bc7a2fe52b66cc37d7975a857aa10,
        '~food':   _v_e0557c3c5704b931850af76dead6efd9,
        '~crate':  _v_c797d408f7b049c004e49d3f49fa774e,
        '~doodad': _v_6ce34df54cc3537ce7a07a57a1766841,
        '~wall':   _v_ad14edcadf336bce9ec7c6c5393a9ebd,
        '~key':    _v_213406f84317090168e8e26e87efb97a,
        '~door':   _v_2e06b4fe7d52093a63a16a8e3107908d,
        '~mirror': _v_37552d401afc21ec67f9f96c9b542d76,
        '~grate':  _v_37a1e7ca032d601717527e5fecbdb802,
        '~locked_door': _v_2800eeb04d6a206430f03fb052b78d1c
      };

  return function(level_i) {
    var level,
        controllables,
        current_world,
        obj_repr,
        obj_symbol,
        obj;

    if (level_i >= levels.length || level_i < 0) {
      return false;
    }

    level = levels[level_i];
    current_world = Object.create(world);

    current_world.init(level.title, level.win);
    current_world.messages = level.submessages || [];
    controllables = level.controllables || 0;

    for (var i = 0, l = level.objs.length; i < l; i++) {
      obj_repr = level.objs[i];
      obj_symbol = obj_repr[0];
      obj = Object.create(symbol_map[obj_symbol]);

      obj.init_from_repr(obj_repr);
      current_world.add_object(obj);

      if (i <= controllables) {
        current_world.register_player_character(obj);
      }
    }

    if (level.walls) {
      var x, y, dx, dy, wall;
      for (var i = 0, l = level.walls.length; i < l; i += 4) {
        x = level.walls[i];
        y = level.walls[i+1];
        for (var j = 0, x_limit = level.walls[i+2]; j <= x_limit; j++) {
          for (var k = 0, y_limit = level.walls[i+3]; k <= y_limit; k++) {
            wall = Object.create(symbol_map['~wall']);
            wall.init_from_repr(['~wall', x + j, y + k]);
            current_world.add_object(wall);
          }
        }
      }
    }

    return current_world;
  };
})();
var _v_3fcb4d12e78f0e01e76896a41326cb92 = (function() {
  var image_font  = _v_345411057b2cd0ba9de4cb42274ff600,
      C           = _v_88903d9c789529ef76d3636ebafcdb40,
      level_title = {};

  level_title.draw = function(level_name) {
    return image_font.print_centered(
      'WIZARD ' + level_name,
      C.SCREEN_WIDTH / 2, 10
    );
  };

  return level_title;
})();
var _v_67dc26617d21de6fc3c79a33f79f4a27 = (function() {
  var jerk        = _v_bb618078c0f0dd83dc8b3348758912a6,
      C           = _v_88903d9c789529ef76d3636ebafcdb40,
      progress    = _v_adb6dcd9565aabb59fa1fc3dc840bfe2,
      loader      = _v_ce4ec09afa71f824ec4ccd8edf4b86c2,
      level_title = _v_3fcb4d12e78f0e01e76896a41326cb92,
      submessage  = _v_6d9d44b68ce2b956e68cd318cbcceb4e,
      scene = Object.create(jerk.scene);

  scene.enter = function(prev) {
    if (this.current_level == null) {
      this.current_level = 0;
    }
    this.reload();
    this.clock = 0;
  };

  scene.reload = function() {
    this.world = loader(this.current_level);
    this.level_title = level_title;
  };

  scene.draw = function() {
    var ctx = jerk.ctx;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, C.SCREEN_WIDTH, C.SCREEN_HEIGHT);

    this.world.draw();

    if (this.world.did_win) {
      this.level_title.draw('NEED SATISFIED');
    } else {
      this.level_title.draw(this.world.title);
    }

    this.world.draw_enchantments(this.clock * 255 * 3 / 2000);
    this.world.draw_poofs();
  };

  scene.update = function(dt) {
    this.clock += dt;
    if (this.clock < 0) {
      this.clock = 0;
    }
    if (this.clock > 2000) {
      this.clock = this.clock % 2000;
    }
    if (this.world.poofs) {
      if (this.world.poofs.time == null) {
        this.world.poofs.time = 0;
      } else {
        this.world.poofs.time += dt;
      }
    }
  };

  scene.onkeydown = function(e) {
    var code = e.keyCode || e.charCode;
    if (this.world.did_win) {
      if (code == C.K_SPACE) {
        this.current_level++;
        this.reload();
      }
      return;
    }

    if (code == C.K_R) {
      this.reload();
      return
    }

    if (this.world.is_casting) {
      if (code == C.K_UP) {
        this.world.cast_magic_up();
      } else if (code == C.K_DOWN) {
        this.world.cast_magic_down();
      } else if (code == C.K_LEFT) {
        this.world.cast_magic_left();
      } else if (code == C.K_RIGHT) {
        this.world.cast_magic_right();
      }
    } else {
      if (code == C.K_UP) {
        this.world.move_char_up();
      } else if (code == C.K_DOWN) {
        this.world.move_char_down();
      } else if (code == C.K_LEFT) {
        this.world.move_char_left();
      } else if (code == C.K_RIGHT) {
        this.world.move_char_right();
      }
    }

    if (code == C.K_SPACE) {
      if (this.world.is_casting) {
        this.world.stop_magic();
      } else {
        this.world.start_magic();
      }
    }
  };

  return scene;
})();
var jerk = _v_bb618078c0f0dd83dc8b3348758912a6,
    // load images
    images = _v_4f56deb9c6452b7febdaa365d9243ab0,
    scenes = [
      _v_67dc26617d21de6fc3c79a33f79f4a27
    ];

jerk.registerScenes(scenes);
jerk.begin(document.getElementById('canvas'), scenes[0]);
