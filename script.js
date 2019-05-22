var board = {};
var turn = {
  active : "blue", //0
  count : 0,
  next: function(){
    this.count++;
    if(this.count > 41){
      // GAME OVER. Condition 3.
      console.log("Game Over!");
    } else if (this.count % 2 == 0){
      this.active = "blue";
    }else{
      this.active = "red";
    }
    return [this.count, this.active];
  }
};

function draw_board(columns, rows) {
  var col, row;
  //var i = 0;
  for(row=1; row<=rows; row++){
    for(col=1; col<=columns; col++){
      var item = document.createElement("BUTTON");
      item.id = "item-"+col+"-"+row;
      item.className = "empty";
      item.type = "button";
      item.onclick = function(){select(this.id, turn.active)};
      item.innerHTML = col +"-"+row;
      item.setAttribute("data-col", col);
      item.setAttribute("data-row", row);
      item.setAttribute("data-space", "");
      document.getElementById("board").appendChild(item);
      board[item.id] = item;
      //i++;
    }
  }
}

function select(item, color){
  //var col = document.getElementById(item).getAttribute("data-col");
  //var row = document.getElementById(item).getAttribute("data-row");
  //console.log(col + " " + row);
  if( drop(item) ){
    console.log(turn.active, item );
    //check for win
    turn.next();
  }
}

function isFilled(item){
  switch(board[item].className) {
    case "empty":
      return false;
      break;
    case "red":
      return true;
      break;
    case "blue":
      return true;
      break;
    default:
      return "ERROR";
  }
}

function fill(item, color){
  board[item].className = color;
}

function drop(item){
  //console.log("Column:", board[item].dataset.col);
  var c = board[item].dataset.col;
  //var column = [];
  // make array
  var dropped = false;
  var start = 6;
  var end = board[item].dataset.row;
  while(!dropped && start >=end){
    //console.log("item", board["item-" + c + "-" + start ]);
    var temp = "item-" + c + "-" + start;
    //column.push(temp);
    if( !isFilled(temp) ){ // is empty
      dropped = true;
      fill(temp, turn.active);
    }
    start--;
  }
  return true;
}
