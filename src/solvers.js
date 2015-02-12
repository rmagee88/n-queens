/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution;
  var board = new Board({n:n});
  var matrix = board.rows();
  var recursiveSearch = function(currentRow){
    currentRow = currentRow || 0;
    if(currentRow === matrix.length){
      solution = matrix;
      return;
    }else{
      for (var col = 0; col < n; col++) {
        matrix[currentRow][col] = 1;
        //if there IS a conflict
        if(board.hasRowConflictAt(currentRow) || board.hasColConflictAt(col)){
          matrix[currentRow][col] = 0;
          continue;
        }else{
          recursiveSearch(currentRow+1);
          if (solution) return
          for (var col2 = 0; col2 < n; col2++) {
            matrix[currentRow][col2] = 0;
          }
        }
      }
    }
  };

  recursiveSearch();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});
  var matrix = board.rows();
  var recursiveSearch = function(currentRow){
    currentRow = currentRow || 0;
    if(currentRow === matrix.length){
      solutionCount++;
    }else{
      for (var col = 0; col < n; col++) {
        matrix[currentRow][col] = 1;
        //if there IS a conflict
        if(board.hasRowConflictAt(currentRow) || board.hasColConflictAt(col)){
          matrix[currentRow][col] = 0;
          continue;
        }else{
          recursiveSearch(currentRow+1);
          for (var col2 = 0; col2 < n; col2++) {
            matrix[currentRow][col2] = 0;
          }
        }
      }
    }
  };

  recursiveSearch();

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var board = new Board({n:n});
  var matrix = board.rows();
  var recursiveSearch = function(currentRow, numQueens){
    numQueens = numQueens || 0;
    currentRow = currentRow || 0;
    if(currentRow === matrix.length){
      if (numQueens === n) {
        // if we have the right # of queens, it's a solution
        solution = matrix;
        return;

      }
    }else{
      for (var col = 0; col < n; col++) {
        matrix[currentRow][col] = 1;
        var majorColIndex = col - currentRow;
        var minorColIndex = col + currentRow;
        //if there IS a conflict
        if(board.hasRowConflictAt(currentRow) || board.hasColConflictAt(col)
            || board.hasMinorDiagonalConflictAt(minorColIndex)
            || board.hasMajorDiagonalConflictAt(majorColIndex)){

          matrix[currentRow][col] = 0;
          continue;
        }else{
          numQueens++;
          recursiveSearch(currentRow+1, numQueens);
          if (solution) return;
          // resetting row
          for (var col2 = 0; col2 < n; col2++) {
            if (matrix[currentRow][col2]) {
              numQueens--;
              matrix[currentRow][col2] = 0;
            }

          }
        }
      }
    }
  };

  if(n !== 0){
    recursiveSearch();
  }

  if (n === 0) {
    solution = [];
  }

  if (!solution) {
    solution = matrix;
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});
  var matrix = board.rows();
  var recursiveSearch = function(currentRow, numQueens){
    numQueens = numQueens || 0;
    currentRow = currentRow || 0;
    if(currentRow === matrix.length){
      if (numQueens === n) {
        // if we have the right # of queens, it's a solution
        solutionCount++;

      }
    }else{
      for (var col = 0; col < n; col++) {
        matrix[currentRow][col] = 1;
        var majorColIndex = col - currentRow;
        var minorColIndex = col + currentRow;
        //if there IS a conflict
        if(board.hasRowConflictAt(currentRow) || board.hasColConflictAt(col)
            || board.hasMinorDiagonalConflictAt(minorColIndex)
            || board.hasMajorDiagonalConflictAt(majorColIndex)){

          matrix[currentRow][col] = 0;
          continue;
        }else{
          numQueens++;
          recursiveSearch(currentRow+1, numQueens);
          for (var col2 = 0; col2 < n; col2++) {
            if (matrix[currentRow][col2]) {
              numQueens--;
              matrix[currentRow][col2] = 0;
            }

          }
        }
      }
    }
  };

  if(n !== 0){
    recursiveSearch();
  }

  if (n === 0) {
    solutionCount = 1;
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
