const gray = 40
const squareSize = 10

let rainbow = true

let fr = 10
var hue = 0;

const width = 500
const height = 500 
let matrixHeight = height / squareSize
let matrixWidth = width / squareSize

let matrix = new Array(matrixHeight+2)
for (var i = 0; i < matrix.length; i++) {
  matrix[i] = new Array(matrixWidth + 2).fill(1)
}

// let matrix = new Array(matrixHeight +2) * (matrixWidth + 2))

function setup() {
  createCanvas(width, height);
  background(200);

  frameRate(fr)
 

  fill(gray)
  for (i = 0; i < matrixHeight; i++) {
    for(j = 0; j < matrixWidth; j++) {
      if (i < matrixHeight && j < matrixWidth) 
        rect(j*squareSize, i*squareSize, squareSize, squareSize)
    }
  } 
  frameRate(fr)
  noLoop()
}



function draw() {
  for (i = 0; i < matrixHeight; i++) {
     for(j = 0; j < matrixWidth; j++) {
        //  if (matrix[(i + 1) * matrixWidth + j + 1] == 1) {
          if (matrix[i + 1][j + 1] == 1) {
            if (rainbow == true) {
              hue = (matrixHeight - distance(matrixHeight/2, matrixWidth/2, i, j)) * 15 % 360;
              fillRainbow(hue)
            } else {
              fill(255)
            }
         } else {
           fill(gray)
         }
         rect(j*squareSize, i*squareSize, squareSize, squareSize)
     }
  }
  //print(matrix[matrixHeight+ matrixWidth + 1 ])
  if (isLooping())
    updateMatrix();
}

function distance(x1, y1, x2, y2) {
  return sqrt((x2 -x1) * (x2 -x1) + (y2 -y1) * (y2 -y1))
}

function fillRainbow(hue) {
  colorMode(HSL, 360)
  fill(hue, 200, 200)
  colorMode(RGB)
}

function keyPressed()  {
  if (keyCode == 80) {  // play/pause (p)
    if (isLooping() == true) {
      noLoop();
      return;
    }
    loop();
  }

  if (keyCode == 83){  // draw a star (s)
    drawStar()
    redraw()
  }

  if (keyCode == UP_ARROW) {
    fr+=5
    frameRate(fr)
  }
  if (keyCode == DOWN_ARROW) {
    fr-=5
    frameRate(fr)
  }
  if (keyCode == 67) {  // clean (c)
    for (i = 1; i <= matrixHeight; i++) {
      for(j = 1; j <= matrixWidth; j++) {
        matrix[i][j] = 0
      }
    }
    redraw()
  }

}

function updateMatrix() {
  // let newMatrix = new Array((matrixHeight + 2) * (matrixWidth + 2)).fill(0)
  let newMatrix = new Array(matrixHeight+2)
  for (var i = 0; i < newMatrix.length; i++) {
    newMatrix[i] = new Array(matrixWidth + 2).fill(0)
  }
  for (i = 1; i <= matrixHeight; i++) {
    for(j = 1; j <= matrixWidth; j++) {
      if (isAlive(i, j)) {
        //newMatrix[i * matrixWidth + j] = 1;
        newMatrix[i][j] = 1;
      } else {
        //newMatrix[i * matrixWidth + j] = 0;
        newMatrix[i][j] = 0;
      }
    }
  }
  matrix = newMatrix
}

function isAlive(i, j) {
  neighbours = nrOfNeighbours(i, j);
  // if ((neighbours == 2 || neighbours == 3) && matrix[i * matrixHeight + j] == 1)
  if ((neighbours == 2 || neighbours == 3) && matrix[i][j] == 1)
    return true
  // if (neighbours == 3 && matrix[i * matrixHeight + j] == 0)
  if (neighbours == 3 && matrix[i][j] == 0)
    return true
  return false
}

function nrOfNeighbours(i, j) {
  // return matrix[ (i - 1) * matrixWidth + j - 1] + 
  // + matrix[ i * matrixWidth + j - 1] +
  // + matrix[ (i - 1) * matrixWidth + j] +
  // + matrix[ (i + 1) * matrixWidth + j + 1] +
  // + matrix[ (i + 1) * matrixWidth + j] +
  // + matrix[ i * matrixWidth + j + 1] + 
  // + matrix[ (i + 1) * matrixWidth + j - 1]
  // + matrix[ (i - 1) * matrixWidth + j + 1];
  return matrix[i - 1][j - 1] + 
  + matrix[i][j - 1] +
  + matrix[i - 1][j] +
  + matrix[i + 1][j + 1] +
  + matrix[i + 1][j] +
  + matrix[i][j + 1] + 
  + matrix[i + 1][j - 1]
  + matrix[i - 1][j + 1];
}

function mouseClicked() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height)
    return
  x = floor(mouseX / squareSize) + 1;
  y = floor(mouseY / squareSize) + 1;
  // if (matrix[y * matrixWidth + x]) {
  //   matrix[y * matrixWidth + x] = 0;
  // } else {
  //   matrix[y * matrixWidth + x] = 1;
  // }
  if (matrix[y][x]) {
    matrix[y][x] = 0;
  } else {
    matrix[y][x] = 1;
  }
  redraw()
}

function drawStar() {
  for (i = 1; i <= matrixHeight; i++) {
    for(j = 1; j <= matrixWidth; j++) {
      if (i + matrixWidth/2 == j + matrixHeight/2 || i == matrixHeight/2 || j == matrixWidth/2 || i + j == (matrixHeight + matrixWidth) / 2)
        matrix[i][j] = 1
      else
       matrix[i][j] = 0
    }
  }
}


