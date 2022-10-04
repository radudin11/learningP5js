const w = 450
const h = 450
const CELLSIZE = 15
const NOTCHECKED = -1
const FLAGGED = -2
const BOMB = -3
const FLAGGED_BOMB = -4


let matrixHeight = h / CELLSIZE
let matrixWidth = w / CELLSIZE

let matrix = new Array(matrixHeight+2)
for (var i = 0; i < matrix.length; i++) {
  matrix[i] = new Array(matrixWidth + 2).fill(NOTCHECKED)
}

matrix[5][5] = BOMB

let directions = new Array(8);
for (var i = 0; i < directions.length; i++) {
  directions[i] = new Array(2)
}
directions = [[0, -1], [0 , 1], [1, -1], [1, 0], [1, 1], [-1, 1], [-1, 0], [-1, -1]]
console.log(directions)

function setup() {
  createCanvas(w, h);
  background(128);
  noLoop();
}

function draw() {
  for (let i = 0; i < matrixHeight;i++){
    for (let j = 0; j < matrixWidth;j++) {
      drawCell(i,j);
    }
  }
 
}


function drawCell(i, j) {
  if (matrix[i + 1][j + 1] == NOTCHECKED || matrix[i + 1][j + 1] == BOMB) {
    fill(100)
    rect(j*CELLSIZE,i*CELLSIZE,CELLSIZE, CELLSIZE);
    return
  }
  if (matrix[i + 1][j + 1] == FLAGGED || matrix[i + 1][j + 1] == FLAGGED_BOMB ) {
    drawFlag(i, j)
    return
  }
  
  fill(192, 192, 192);
  rect(j*CELLSIZE,i*CELLSIZE,CELLSIZE, CELLSIZE);
  if (matrix[i + 1][j + 1] > 0) {
    output = `${matrix[i + 1][j + 1]}`
    let bombsNear = createElement('h6', output)
    bombsNear.style('color', colorPicker(matrix[i + 1][j + 1]))
    bombsNear.position(j*CELLSIZE + 180,i*CELLSIZE)
  }
}

function drawFlag(i,j) {
  fill(250,0,0);
  rect(j*CELLSIZE,i*CELLSIZE,CELLSIZE, CELLSIZE);
}

function colorPicker(nr) {
  if (nr == 1)
    return "#0000FD"
  if (nr == 2)
    return "#017E00"
  if (nr == 3)
    return "#FE0000"
  if (nr == 4)
    return "#010180"
  if (nr == 5)
    return "#810101"
  if (nr == 6)
    return "#008080"
  if (nr == 7)
    return "#000000"
  if (nr == 8)
    return "#808080"


}

function mousePressed() {
  x = floor(mouseX / CELLSIZE) + 1;
  y = floor(mouseY / CELLSIZE) + 1;
  if (mouseButton == RIGHT) {
    if (matrix[y][x] == FLAGGED){
        matrix[y][x] = NOTCHECKED
    } else {
        if (matrix[y][x] == NOTCHECKED){
            matrix[y][x] = FLAGGED
        }
    }
    if (matrix[y][x] == BOMB){
        console.log("Bomb")
        matrix[y][x] = FLAGGED_BOMB
    } else {
        if (matrix[y][x] == FLAGGED_BOMB) {
            matrix[y][x] = BOMB
        }
    }
  }

  if (mouseButton == LEFT) {
    console.log("Pressed left")
    updateMatrix(x, y);
  }
  console.log(matrix[y][x])
  redraw()
}

function youLost() {
    console.log("You lost!")
}

function updateMatrix(x, y) {
  console.log("updating matrix")
  console.log(matrix[y][x])

  if (matrix[y][x] == BOMB) {
    youLost();
    return
  }

  if (matrix[y][x] == NOTCHECKED) {
    console.log("finding bombs")
    findBombsRec(x,y)
  }
}

function findBombsRec(x,y) {
  if (matrix[y][x] == BOMB || matrix[y][x] == FLAGGED_BOMB )
    return 1;
  if (matrix[y][x] == FLAGGED)
    return 0;
  matrix[y][x] = 0
  for (let i = 0; i < 8; i++) {
    new_y = y + directions[i][0]
    new_x = x + directions[i][1]
    if (new_y == 0 || new_y > matrixHeight || new_x == 0 || new_x > matrixWidth)
      continue
    if (matrix[new_y][new_x] < 0)
        matrix[y][x] += findBombsRec(new_x, new_y)
  }
}