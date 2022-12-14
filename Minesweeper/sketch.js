const CELLSIZE = 15
const w = 16 * CELLSIZE
const h = 30 * CELLSIZE
const NOTCHECKED = -1
const FLAGGED = -2
const BOMB = -3
const FLAGGED_BOMB = -4
const NR_OF_BOMBS = 99


let matrixHeight = h / CELLSIZE
let matrixWidth = w / CELLSIZE


// grid saved as 2d array
let matrix = new Array(matrixHeight)
for (var i = 0; i < matrix.length; i++) {
  matrix[i] = new Array(matrixWidth).fill(NOTCHECKED)
}

// directions array
// directions[n][0] for y
// directions[n][1] for x
let directions = new Array(8);
for (var i = 0; i < directions.length; i++) {
  directions[i] = new Array(2)
}
directions = [
  [0, -1],  // LEFT 
  [0 , 1],  //RIGHT
  [1, 0],   //DOWN
  [-1, 0],  //UP
  [1, 1],   // RIGHT_DOWN
  [-1, 1],  //RIGHT_UP
  [1, -1],  // LEFT_DOWN
  [-1, -1]  // LEFT_UP
  ]
console.log(directions)

function setup() {
  createCanvas(w, h);
  background(128);
  placeBombs();
  noLoop();
}

function draw() {
  for (let i = 0; i < matrixHeight;i++){
    for (let j = 0; j < matrixWidth;j++) {
      drawCell(i,j);
    }
  }
}

function placeBombs() {
  /* places bombs randomly on the grid
   * to change the number of bombs change 
   *the NR_OF_BOMBS constant at the top
   */  
  let bombsPlaced = 0
    while (bombsPlaced < NR_OF_BOMBS) {
        y = floor(random() * matrixHeight)
        x = floor(random() * matrixWidth)
        if (matrix[y][x] == NOTCHECKED) {
            matrix[y][x] = BOMB
            bombsPlaced++;
        }
    }
}

function drawCell(i, j) {
  /* draws a square on the screen based on the value
   * int the matrix at the given position
  */
  if (matrix[i][j] == NOTCHECKED){
    fill(100)
    rect(j*CELLSIZE,i*CELLSIZE,CELLSIZE, CELLSIZE);
    return
  }

  if (matrix[i][j] == BOMB) {
    fill(100)

    // uncoment to highlight bombs
    // fill(0, 255, 0)

    rect(j*CELLSIZE,i*CELLSIZE,CELLSIZE, CELLSIZE);
    return
  }

  if (matrix[i][j] == FLAGGED || matrix[i][j] == FLAGGED_BOMB ) {
    drawFlag(i, j)
    return
  }
  
  fill(192, 192, 192);
  rect(j*CELLSIZE,i*CELLSIZE,CELLSIZE, CELLSIZE);
  if (matrix[i][j] > 0) {
    output = `${matrix[i][j]}`
    let bombsNear = createElement('h6', output)
    bombsNear.style('color', colorPicker(matrix[i][j]))
    bombsNear.position(j*CELLSIZE + 125,i*CELLSIZE)
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
  x = floor(mouseX / CELLSIZE);
  y = floor(mouseY / CELLSIZE);
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
  matrix[y][x] = 0
  for (let i = 0; i < 8; i++) {
    new_y = y + directions[i][0]
    new_x = x + directions[i][1]
    if (new_y < 0 || new_y >= matrixHeight || new_x < 0 || new_x >= matrixWidth)
      continue
    if (matrix[new_y][new_x] == BOMB || matrix[new_y][new_x] == FLAGGED_BOMB)
        matrix[y][x]++;
  }
  if (matrix[y][x] > 0)
    return
  for (let i = 0; i < 8; i++) {
    new_y = y + directions[i][0]
    new_x = x + directions[i][1]
    if (new_y < 0 || new_y >= matrixHeight || new_x < 0 || new_x >= matrixWidth)
      continue
    if (matrix[new_y][new_x] == NOTCHECKED)
        findBombsRec(new_x, new_y)
  }
}