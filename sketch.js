
var database;

var curr_line = [];

var drawing = [];

var points, button;

var prevX, prevY;

var mode = true;

function setup() {
  createCanvas(1200, 600);

  background(0, 0, 0);
  stroke(255);
  fill(255)

  database = firebase.database();

  var ballRef = database.ref('brush/lines');
  ballRef.on("value", readPosition);

}

function draw() {

  button = createButton('Save');
  // button.style('background-color', color('white'));
  button.position(600, 500);
  button.mousePressed(saveDrawing)

}

function mouseReleased() {
  drawing.push(curr_line);
  prevX = null;
  prevY = null;

  curr_line = [];

  // drawPainting(drawing);
  console.log(drawing);
}

function mouseDragged() {

  if (prevX == null) {
    point(mouseX, mouseY);
  } else {
    line(prevX, prevY, mouseX, mouseY);
  }
  savePosition(mouseX, mouseY)

  prevX = mouseX;
  prevY = mouseY;
}

function savePosition(x, y) {
  curr_line.push({ x, y })
}

function saveDrawing() {


  database.ref('brush/lines').set(drawing)

}


function readPosition(data) {

  firebaseDrawing = data.val();

  drawPainting(firebaseDrawing);

}

function drawPainting(firebaseDrawing) {

  console.log(firebaseDrawing);

  for (var i = 0; i < firebaseDrawing.length; i++) {
    var cLine = firebaseDrawing[i];
    for (var j = 0; j < cLine.length; j++) {
      var pos = cLine[j];
      if (j == 0) {
        point(pos.x, pos.y);
      } else {
        line(cLine[j - 1].x, cLine[j - 1].y, pos.x, pos.y);
      }
    }

  }

}