'use strict';

goog.provide('Drawer');

/**
 *
 * @param {Array<Number>} data массив чисел
 * @param {Number} w ширина графика
 * @param {Number} h высота графика
 * @constructor
 */
Drawer = function(data, w, h) {
  this.data = data;
  this.stageWidth = w;
  this.stageHeight = h;
  this.stage = acgraph.create('container', this.stageWidth, this.stageHeight);
  this.axispath = this.stage.path();
  this.dataLayer = this.stage.layer().translate(15, -15);
  this.graphpath = this.dataLayer.path();
  this.dotsLayer = this.dataLayer.layer();
  this.labels = this.dataLayer.layer();
};

/**
 *
 */
Drawer.prototype.drawAxis = function() {
  this.axispath
    .stroke('black')
    .moveTo(this.stageWidth - 15, this.stageHeight - 15)
    .lineTo(15, this.stageHeight - 15)
    .moveTo(15, 15)
    .lineTo(15, this.stageHeight - 15)
    .close();
  acgraph.vector.primitives.triangleUp(this.axispath, 15, 15, 5).fill('black');
  acgraph.vector.primitives.triangleRight(this.axispath, this.stageWidth - 15, this.stageHeight - 15, 5).fill('black');
};

/**
 *
 * @param {Number} x
 * @param {Number} y
 * @returns {Object}
 */
Drawer.prototype.drawDot = function(x, y) {
  return this.dotsLayer.circle(x * 20, this.stageHeight - y * 10, 5).zIndex(2).fill('red');
};

/**
 *
 * @param {Object} dot
 * @param {Number} x
 * @param {Number} y
 * @returns {{text: Object, rect: Object}}
 */
Drawer.prototype.drawTooltip = function(dot, x, y) {
  var text = this.labels.text(dot.centerX(), dot.centerY(), 'x=' + x + ', y=' + y).visible(false);
  if (dot.centerX() > this.stageWidth / 2) {
    text.translate(-text.getWidth() - dot.getWidth() * 1.5, -text.getHeight() / 2);
  } else {
    text.translate(text.getWidth() / 4, -text.getHeight() / 2);
  }

  var rect = this.labels.rect(text.getX() - 3, text.getY() - 3, text.getWidth() + 6, text.getHeight() + 6).zIndex('-1').fill("gold").visible(false);

  return {
    text: text,
    rect: rect
  }
};

/**
 *
 * @param {Object} dot
 * @param {Object} tooltip
 */
Drawer.prototype.addListeners = function(dot, tooltip) {
  dot.listen('mouseover', function() {
    tooltip.text.visible(true);
    tooltip.rect.visible(true);
  });
  dot.listen('mouseout', function() {
    tooltip.text.visible(false);
    tooltip.rect.visible(false);
  });
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
Drawer.prototype.draw = function() {
  this.drawAxis();
  for (var x = 0; x < this.data.length; x++) {
    var y = this.data[x];
    var dot = this.drawDot(x, y);
    var tooltip = this.drawTooltip(dot, x, y);
    this.addListeners(dot, tooltip);
    this.drawLine(x, y, this.data[x + 1]);
  }
  this.graphpath.close();
};