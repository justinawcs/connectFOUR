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
    turn.next();
    //check for win
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
  var end = board[item_name].dataset.row;
  while(!dropped && start >=end){
    //console.log("item", board["item-" + c + "-" + start ]);
    var temp = "item-" + c + "-" + start;
    //column.push(temp);
    if( !isFilled(temp) ){ // is empty
      dropped = true;
      fill(temp, turn.active);
      return true;
    }
    start--;
  }
  return false;
}

var look = function(color, posy, posx, dy, dx, count){
    var item = "item-" + posy +"-"+ posx;
    //var next = "item-" + (posy+dy) +"-"+ (posx+dx); // (col) + (row)
    if(!isColor(color, item)){ //terminal case
        return count; // false
    }else {
        //count++;
        console.log(item, "count", count+1 );
        return look(color, (posy+dy), (posx+dx), dy, dx, count+1);
    }
};

function search(color, item){
    var col = board[item].getAttribute("data-col");
    var row = board[item].getAttribute("data-row");
    console.log("col:", col, "row:", row);
    //horizontal
    console.log("left", new look(color, col, row, -1, 0, 0) );
    console.log("right", new look(color, col, row, 1, 0, 0) );
}

var test = function(number){
    if (number <= 0) { // terminal case
        return 1;
    } else { // block to execute
        return (number * test(number - 1));
    }
};
