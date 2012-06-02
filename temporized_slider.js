/**
 * TemporizedSlider.js
 *
 * Copyright 2012, Lukas Alexandre
 * Licensed under MIT
 *
 * @module temporized_slider
*/

var TemporizedSlider = {};

TemporizedSlider.init = function(options) {
  var default_args = {
    'default_time' : 0,
    'data' : [{
      image : 'https://www.google.com.br/images/srpr/logo3w.png',
      title : 'my title',
      text  : 'temporized text',
      time  : 1
    },{
      image : 'http://railsbrasil.s3.amazonaws.com/sites/4e2c66cde8fb0e0001000004/theme/images/rails.png',
      title : 'my rails title',
      text  : 'temporized rails text',
      time  : 1
    }]
  };

  for(var index in default_args) {
    if(typeof options[index] === "undefined") options[index] = default_args[index];
  }

  collection = options.data;

  pointer = -1;
  end = collection.length - 1;
  timeOut = null;
  paused = false;
};

TemporizedSlider.play = function() {
  paused = false;

  pointer = (pointer + 1 > end) ? 0 : (pointer + 1);

  TemporizedSlider.changeContent();
  TemporizedSlider.scheduleNextChange();
};

TemporizedSlider.pause = function() {
  paused = true;
  clearTimeout(timeOut);
  pointer = (pointer - 1 < 0) ? 0 : (pointer - 1);
};

TemporizedSlider.changeContent = function() {
  var obj = collection[pointer];
  document.getElementById('slider_image').src = obj.image;
  document.getElementById('slider_title').innerHtml = obj.title;
  document.getElementById('slider_title').textContent = obj.title;
  document.getElementById('slider_text').innerHtml = obj.text;
  document.getElementById('slider_text').textContent = obj.text;
};

TemporizedSlider.scheduleNextChange = function() {
  clearTimeout(timeOut);
  timeOut = setTimeout('TemporizedSlider.play()', collection[pointer].time * 1000);
}