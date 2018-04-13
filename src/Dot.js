goog.provide('Dot');
goog.require('Drawer');

/**
 *
 * @param x
 * @param y
 * @param layer
 * @constructor
 * @extends {Drawer}
 */
Dot = function(x, y, layer) {
  Drawer.call(this);
  this.x = x;
  this.y = y;
  this.layer = layer;
  this.dot = this.layer.circle(this.x * 20, this.stageHeight - this.y * 10, 5).zIndex(1).fill('red');
};

goog.inherits(Dot, Drawer);

/**
 *
 * @returns {Dot}
 */
Dot.prototype.addTooltip = function() {
  this.text = this.layer.text(this.dot.centerX(), this.dot.centerY(), 'x=' + this.x + ', y=' + this.y).zIndex(3).visible(false);
  if (this.dot.centerX() > this.stageWidth / 2) {
    this.text.translate(-this.text.getWidth() - this.dot.getWidth() * 1.5, -this.text.getHeight() / 2);
  } else {
    this.text.translate(this.text.getWidth() / 4, -this.text.getHeight() / 2);
  }

  this.rect = this.layer.rect(this.text.getX() - 3, this.text.getY() - 3, this.text.getWidth() + 6, this.text.getHeight() + 6).zIndex(2).fill("gold").visible(false);

  return this
};

/**
 *
 */
Dot.prototype.addListeners = function() {
  var self = this;
  this.dot.listen('mouseover', function() {
    self.text.visible(true);
    self.rect.visible(true);
  });
  this.dot.listen('mouseout', function() {
    self.text.visible(false);
    self.rect.visible(false);
  });
};