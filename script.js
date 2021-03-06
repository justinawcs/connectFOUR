var board = {};
var turn = {
  active : "blue", //0
  count : 0,
  end_game: false,
  next: function(){
    this.count++;
    if(this.count > 41){
      // GAME OVER. Condition 3.
      console.log("Game Over!");
    } else if (this.count % 2 == 0){
      this.active = "blue";
      document.getElementById("player2").classList.add("wait");
      document.getElementById("player1").classList.remove("wait");
    }else{
      this.active = "red";
      document.getElementById("player1").classList.add("wait");
      document.getElementById("player2").classList.remove("wait");
    }
    return [this.count, this.active];
  },
  name: function(){
    if(this.active === "blue"){
      return "player1";
    }else{
      return "player2";
    }
  },
  reset : function(){
    this.active = "blue";
    this.count = 0;
    this.end_game = false;
    document.getElementById("player2").classList.add("wait");
    document.getElementById("player1").classList.remove("wait");
  }
};

function reset(){
  document.getElementById(turn.name()).classList.remove("winner");
  turn.reset();
  var col, row, item;
  for(row=1; row<=board.rows; row++){
    for(col=1; col<=board.columns; col++){
      item = board["item-"+col +"-"+ row];
      item.className = "empty";
    }
  }
}

function draw_board(columns, rows) {
  board.columns = columns;
  board.rows = rows;
  var col, row;
  //var i = 0;
  for(row=1; row<=rows; row++){
    for(col=1; col<=columns; col++){
      var item = document.createElement("BUTTON");
      item.id = "item-"+col+"-"+row;
      item.className = "empty";
      item.type = "button";
      item.onclick = function(){select(this.id, turn.active)};
      //item.innerHTML = col +"-"+row;
      item.setAttribute("data-col", col);
      item.setAttribute("data-row", row);
      //item.setAttribute("data-space", "");
      document.getElementById("board").appendChild(item);
      board[item.id] = item;
      //i++;
    }
  }
}

function select(item, color){
  if(turn.end_game){
    return;
  }
  //var col = document.getElementById(item).getAttribute("data-col");
  //var row = document.getElementById(item).getAttribute("data-row");
  //console.log(col + " " + row);
  result = drop(item);
  if( result[0] ){
    if( search(turn.active, result[1]) ){
      //Winner Game over
      console.log(turn.active, "is the Winner!");
      document.getElementById(turn.name()).classList.add("winner");
      turn.end_game = true;
    }else{
      turn.next();
    }
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

function isColor(color, item){
    try{
        var it = board[item].className;
    }catch(TypeError){
        //console.log(item + " Out of Bounds");
        return false;
    }
    if(it == "empty"){
        return false;
    }else if(it == color){
        return true;
    }else{
        return false
    }
}

function fill(item, color){
  board[item].className = color;
}

function drop(item_name){
  //console.log("Column:", board[item_name].dataset.col);
  var c = board[item_name].dataset.col;
  //var column = [];
  // make array
  var dropped = false;
  var start = 6;
  //var end = board[item_name].dataset.row;
  while(!dropped ){
    //console.log("item", board["item-" + c + "-" + start ]);
    var temp = "item-" + c + "-" + start;
    //column.push(temp);
    if( !isFilled(temp) ){ // is empty
      console.log("Dropped: ", turn.active, temp);
      dropped = true;
      fill(temp, turn.active);
      //search
      //search(turn.active, temp);
      return [true, temp];
    }
    start--;
  }
  return false;
}

function look(color, col, row, dCol, dRow, count){
    var item = "item-" + col +"-"+ row;
    if(!isColor(color, item)){ //terminal case
      //console.log("stop:", item);
      return count; // false
    }else {
      //count++;
      //console.log("looking: ", item, "count", count+1 );
      return (look(color, Number(col)+Number(dCol), Number(row)+Number(dRow),
          dCol, dRow, count+1) );
    }
}

function search(color, item){
    var col = board[item].getAttribute("data-col");
    var row = board[item].getAttribute("data-row");
    //console.log("col:", col, "row:", row);
    //horizontal
    var left = look(color, col, row, -1, 0, -1) ;
    var right = look(color, col, row, 1, 0, -1) ;
    var h_total = left + right +1;
    console.log("left", left, "right", right,
        "Total", h_total);
    //vertical
    var up = look(color, col, row, 0, -1, -1);
    var down = look(color, col, row, 0, 1, -1);
    var v_total = up + down +1;
    console.log("up", up, "down", down,
        "Total", v_total);
    //diagonal
    var upleft = look(color, col, row, -1, -1, -1);
    var downright = look(color, col, row, 1, 1, -1);
    var d1_total = upleft + downright +1;
    console.log("up-Left", upleft, "down-right", downright,
        "Total", d1_total);
    var upright = look(color, col, row, 1, -1, -1);
    var downleft = look(color, col, row, -1, 1, -1);
    var d2_total = upright + downleft +1;
    console.log("up-right", upright,"down-Left",  downleft,
        "Total", d2_total);
    if( h_total >=4 || v_total >=4 || d1_total >=4 || d2_total >= 4){
      console.log(turn.active, "wins");
      return true;
    }else{
      return false;
    }
}

var test = function(number){
    if (number <= 0) { // terminal case
        return 1;
    } else { // block to execute
        return (number * test(number - 1));
    }
};
