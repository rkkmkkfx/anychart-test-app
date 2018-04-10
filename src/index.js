goog.require('Drawer');

var width = window.innerWidth - 40;
var height = window.innerHeight - 100;
var input = document.getElementById('dataInput');
input.addEventListener('keypress', function(ev) {
  if (ev.key === ' ') {
    var data = ev.target.value.split(' ');
    for (var i = 0; i < data.length; i++) {
      data[i] = parseInt(data[i]);
    }
    document.getElementById('container').innerHTML = '';
    var svgEl = document.querySelector('svg');
    if (svgEl !== null) svgEl.remove();
    var chart = new Drawer(data, width, height);
    chart.draw();
  }
});