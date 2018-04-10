'use strict';
var width = window.innerWidth-40;
var height = window.innerHeight-40;

function getRandomArray() {
  var l = Math.floor(Math.random() * width / 20);
  var arr = [];

  for (var i = 0; i < l; i++) {
    arr.push(Math.floor(Math.random() * (height - 30) / 10));
  }

  if (arr.length < 1) getRandomArray();
  return arr;
}

var data = getRandomArray();
var chart = new Drawer(data, width, height);

chart.draw();
