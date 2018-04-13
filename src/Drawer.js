'use strict';

goog.provide('Drawer');

/**
 *
 * @param {Array<Number>} data массив чисел
 * @constructor
 */
Drawer = function(data) {
  this.data = data;
  this.stageWidth = stage.width();
  this.stageHeight = stage.height();
};

/**
 *
 */
Drawer.prototype.drawAxis = function(layer) {
  layer
    .stroke('black')
    .moveTo(this.stageWidth - 15, this.stageHeight - 15)
    .lineTo(15, this.stageHeight - 15)
    .moveTo(15, 15)
    .lineTo(15, this.stageHeight - 15)
    .zIndex('-1')
    .close();
  acgraph.vector.primitives.triangleUp(layer, 15, 15, 5).fill('black');
  acgraph.vector.primitives.triangleRight(layer, this.stageWidth - 15, this.stageHeight - 15, 5).fill('black');
};

/**
 *
 * @param {Number} x
 * @param {Number} y
 * @returns {Object}
 */
Drawer.prototype.drawDot = function(x, y) {
  return new Dot(x, y, this.dataLayer).addTooltip().addListeners();
};

/**
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} nextY
 */
Drawer.prototype.drawLine = function(x, y, nextY) {
  if (nextY !== undefined) {
    this.graphpath.moveTo(x * 20, this.stageHeight - y * 10);
    this.graphpath.lineTo((x + 1) * 20, this.stageHeight - nextY * 10).stroke('5 black .5');
  }
};

/**
 *
 */
Drawer.prototype.draw = function(stage) {
  this.dataLayer = stage.layer().translate(15, -15);
  this.axispath = stage.path();
  this.graphpath = this.dataLayer.path();

  this.drawAxis(this.axispath);
  for (var x = 0; x < this.data.length; x++) {
    var y = this.data[x];
    this.drawDot(x, y);
    this.drawLine(x, y, this.data[x + 1]);
  }
  this.graphpath.close();
};