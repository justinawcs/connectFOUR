board = {};


function draw_board(columns, rows) {
  var col, row;
  //var i = 0;
  for(row=1; row<=rows; row++){
    for(col=1; col<=columns; col++){
      var item = document.createElement("BUTTON");
      item.id = "item-"+col+"-"+row;
      item.className = "space";
      item.type = "button";
      item.onclick = function(){select(this.id)};
      item.innerHTML = col +"-"+row;
      item.setAttribute("data-col", col);
      item.setAttribute("data-row", row);
      item.setAttribute("data-space", "");
      document.getElementById("board").appendChild(item);
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
