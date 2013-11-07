(function(){
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