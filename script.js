board = document.getElementById('board');

function draw_board(columns, rows) {
  var col, row;
  var i = 0;
  for(row=1; row<=rows; row++){
    for(col=1; col<=columns; col++){
      item = document.createElement("BUTTON");
      item.id = "item-"+i;
      item.className = "item";
      item.type = "button";
      item.onclick = function(){select(this.id)};
      item.innerHTML = i;
      item.setAttribute("data-space", "");
      document.getElementById("board").appendChild(item);
      i++;
    }
  }
}

function select(item){
  console.log(item);
}

// returns only the number part of the item name, 'item-3' -> 3
function strip_name(item){
  var start = item.indexOf("-") + 1;
  return Number( item.slice(start));
}
