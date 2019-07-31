document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: []
};

newGame();

function newGame(){
  for (var x = 0; x < 6; x++){
    for (var y = 0; y < 6; y++){
      board.cells.push({row: x, col: y, isMine: false, isMarked: false, hidden: true})
    }
  }

  for (var i = 0; i < 6; i++){
    plantABomb();
  }
}

function plantABomb(){
  randomMine = Math.round(Math.random() * 35);
  console.log(randomMine);
  console.log(board.cells);
  if (board.cells[randomMine].isMine) {
    plantABomb();
  } else {
    board.cells[randomMine].isMine = true;
  }
}

function startGame () {
  for (var i = 0; i < board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
    document.addEventListener("click", checkForWin);
    document.addEventListener("contextmenu", checkForWin);
  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (var i = 0; i < board.cells.length; i++){
    if (board.cells[i].isMine && !board.cells[i].isMarked){
      return
    } 
    else if (!board.cells[i].isMine && board.cells[i].hidden){
      return
    }
  }
  lib.displayMessage('You win!')
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 

// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  count = 0;
  for (var i = 0; i < surrounding.length; i++){
    if (surrounding[i].isMine) count++;
  }
  return count;
}

