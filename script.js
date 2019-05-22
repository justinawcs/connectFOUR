board = {};
turn = {
  active : "blue", //0
  count : 0,
  next: function(){
    this.count++;
    if (this.count % 2 == 0){
      this.active = "blue";
    }else{
      this.active = "red";
    }
    return this.count, this.active;
  }
}


function draw_board(columns, rows) {
  var col, row;
  //var i = 0;
  for(row=1; row<=rows; row++){
    for(col=1; col<=columns; col++){
      var item = document.createElement("BUTTON");
      item.id = "item-"+col+"-"+row;
      item.className = "empty";
      item.type = "button";
      item.onclick = function(){select(this.id)};
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
  console.log("clicked "+item);
  var col = document.getElementById(item).getAttribute("data-col");
  var row = document.getElementById(item).getAttribute("data-row");
  console.log(col + " " + row);
}

function isFilled(item){
  switch(board[item].className) {
    case "empty":
      return false;
      break;
    case "red":
      return true, "red";
      break;
    case "blue":
      return true, "blue";
      break;
    default:
      return "ERROR"
  }
}

function fill(item, color){
  board[item].className = color
}

function changeTurn(){

}
