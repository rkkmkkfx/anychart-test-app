goog.require('Dot');

var width = window.innerWidth - 40;
var height = window.innerHeight - 100;
var stage = acgraph.create('container', width, height);
var input = document.getElementById('dataInput');
input.addEventListener('keypress', function(ev) {
  if (ev.key === ' ') {
    var data = ev.target.value.split(' ');
    for (var i = 0; i < data.length; i++) {
      data[i] = parseInt(data[i], 10);
    }
    (new Drawer(data)).draw(stage);
  }
});