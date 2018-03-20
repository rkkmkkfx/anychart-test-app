'use strict';

const stageWidth = window.innerWidth-40;
const stageHeight = window.innerHeight-40;
const stage = acgraph.create('container', stageWidth, stageHeight);

function getRandomArray() {
  const arr = Array.from({length: Math.floor(Math.random() * stageWidth / 20)}, () => Math.floor(Math.random() * (stageHeight - 30) / 10));
  if (arr.length > 1) {
    return arr
  } else {
    getRandomArray();
  }
}

const data = getRandomArray();

const axispath = stage.path();
const dataLayer = stage.layer().translate(15, -15);
const graphpath = dataLayer.path();
const dots = dataLayer.layer();
const labels = dataLayer.layer();


axispath
  .stroke('black')
  .moveTo(stageWidth - 15, stageHeight - 15)
  .lineTo(15, stageHeight - 15)
  .moveTo(15, 15)
  .lineTo(15, stageHeight - 15)
  .close();

acgraph.vector.primitives.triangleUp(axispath, 15, 15, 5).fill('black');
acgraph.vector.primitives.triangleRight(axispath, stageWidth - 15, stageHeight - 15, 5).fill('black');

data.forEach((y, x) => {
  const dot = dots
    .circle(x * 20, stageHeight - y * 10, 5)
    .zIndex(2)
    .fill('red');
  const text = labels.text(x * 20, stageHeight - y * 10, `${y}`).visible(false);
  if (y >= (stageHeight - 30) / 10 - 5) {
    text.translate(-text.getWidth()*2, -text.getHeight()/2);
    console.log(y);
  } else {
    text.translate(-text.getWidth()/2, -text.getHeight() - 15);
  }
  const rect = labels.rect(text.getX() - 3, text.getY() - 3, text.getWidth() + 6, text.getHeight() + 6).zIndex('-1');
  rect.fill("gold").visible(false);
  dot.listen('mouseover', () => {
    text.visible(true);
    rect.visible(true);
  });
  dot.listen('mouseout', () => {
    text.visible(false);
    rect.visible(false);
  });
  if (data[x + 1] !== undefined) {
    graphpath.moveTo(x * 20, stageHeight - y * 10);
    graphpath.lineTo((x + 1) * 20, stageHeight - data[x + 1] * 10).stroke('5 black .5');
  } else {
    console.log(data);
    console.log(x, y);
  }
});

graphpath.close();

