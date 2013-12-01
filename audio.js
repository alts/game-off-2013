(function() {
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
    cast_on_source: load_source('cast_on_source.wav'),
    cast_on_drain: load_source('cast_on_drain.wav')
  };
})();