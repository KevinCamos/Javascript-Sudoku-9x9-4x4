"use strict";
var sudokuLength;
var sudokuCellsRow;
var difficult;
var points;

var t = 0;
var date = new Date(t);
/* Variables para el juego */
var row, col, block, cleanArray, myblock;
var sudokuNumber,
  countError = 0;
var arrUser = new Array();

function logsJSONstringify(...arr) {
  console.log(arr.map((consol) => JSON.stringify(consol)));
}

/* FUNCIONES PARA generateArrays() */
function checkLength(arr) {
  for (let i = 0; i < sudokuLength; i++) {
    if (arr[i].length !== sudokuLength) {
      generateArrays();
      break;
    }
  }
}
function initArray() {
  cleanArray = new Array(sudokuLength);
  myblock = new Array(sudokuLength);
  row = new Array(sudokuLength);
  col = new Array(sudokuLength);
  block = new Array(sudokuLength);
  for (let i = 0; i < sudokuLength; i++) {
    cleanArray[i] = new Array();
    myblock[i] = new Array();
    row[i] = new Array();
    col[i] = new Array();
    block[i] = new Array();
  }
}
function getNumberRandom(max) {
  return Math.floor(Math.random() * max);
}
function findIndexBox(positionRow, positionColumn) {
  let cordRow = Math.floor(positionRow / sudokuCellsRow);
  let cordCol = Math.floor(positionColumn / sudokuCellsRow);
  return cordRow * (sudokuLength / sudokuCellsRow) + cordCol;
}

function forClosure(varFunction) {
  for (let i = 0; i < sudokuLength; i++) {
    for (let e = 0; e < sudokuLength; e++) {
      varFunction(i, e);
    }
  }
}
function generateArrays() {
  var index;
  var count;
  initArray();
  let createPositionsArr = (i, e) => {
    let arrSudoku = [];
    for (let x = 1; x < sudokuLength + 1; x++) {
      if (block[findIndexBox(i, e)].some((thisBlock) => thisBlock === x))
        continue;

      if (row[i].some((thisRow) => thisRow === x)) continue;
      if (col[e].some((thisCol) => thisCol === x)) continue;

      block = cleanArray;
      arrSudoku.push(x);
    }
    count = 0;
    while (arrSudoku.length > 0) {
      index = getNumberRandom(arrSudoku.length);
      sudokuNumber = arrSudoku[index];
      row[i][e] = sudokuNumber;
      col[e][i] = sudokuNumber;
      arrSudoku.splice(index, 1);
    }
    row.map((arrRow, i) =>
      arrRow.map((rowValue, e) => block[findIndexBox(i, e)].push(rowValue))
    );
  };

  forClosure(createPositionsArr);
  row.map((arrRow, i) =>
    arrRow.map((rowValue, e) => myblock[findIndexBox(i, e)].push(rowValue))
  );
  checkLength(myblock);
}
/* FIN FUNCIONES PARA generateArrays() */

/* FUNCIONES PARA generateTable() */
function getMeValue(i, e) {
  console.log(difficult);

  let number = !getNumberRandom(difficult) ? row[i][e] : "";
  if (number > 0) arrUser.push(number);

  return number;
}

var createInput = (i, e) => {
  let input;
  input = document.createElement("INPUT");
  Object.assign(input, {
    type: "number",
    id: i + "" + e,
    max: 9, // pixels
    min: 1, // pixels
    onclick: function () {
      // alert("eh"),
      paint(this.id, this.value);
    },
  });

  return input;
};
function generateTable() {
  var error = document.getElementById("error");
  timeDom();
  pointsDom();
  error.innerText = `${countError}/3-errores`;

  var table = document.createElement("table");
  var trow, cell, input, text;

  /* FOR por cada fila */
  for (let i = 0; i < sudokuLength; i++) {
    trow = document.createElement("tr");
    trow.setAttribute("id", i);
    trow.style.borderLeft = "thick solid black";

    if ((i + 1) % sudokuCellsRow === 0) {
      trow.style.borderBottom = "thick solid black";
    }

    /* FOR por cada Columna */
    for (let e = 0; e < sudokuLength; e++) {
      cell = document.createElement("td");
      text = getMeValue(i, e);
      if (text === "") {
        input = createInput(i, e);
        cell.appendChild(input);
        // cell.setAttribute("onclick", "paint("+i + "" + e+"," + text + ")");
      } else {
        cell.setAttribute("id", i + "" + e);
        cell.setAttribute("onclick", "paint(this.id," + text + ")");
        cell.textContent = text;
      }

      if (!i) cell.style.borderTop = "thick solid black";
      if ((e + 1) % sudokuCellsRow === 0) {
        cell.style.borderRight = "thick solid black";
      }
      trow.appendChild(cell);
    }
    table.appendChild(trow);
  }
  /* Finalización de crera las celdas y columnas  */
  document.getElementById("sudokuTable").appendChild(table);
}
/* FIN FUNCIONES PARA generateTable() */

/* FUNCIONES PARA getGamerValues() */
function paint(id, val) {
  let thisCell;
  let idRow = id[0];
  let idCell = id[1];
  let paintingForPositions = (i, e) => {
    thisCell = document.getElementById(i + "" + e);

    if (idRow == i && idCell == e) {
      thisCell.style.backgroundColor = "lightblue";

      thisCell.style.color = "darkblue";
    } else if (
      i == idRow ||
      e == idCell ||
      findIndexBox(i, e) === findIndexBox(idRow, idCell)
    ) {
      thisCell.style.backgroundColor = "wheat";

      thisCell.style.color = "black";

      // console.log(thisCell.textContent, "textContent");
      // console.log(thisCell.value, "value");
    } else {
      if ((thisCell.textContent == val || thisCell.value ==val) && val != "") {
        // console.log("entra");
        thisCell.style.backgroundColor = "peru";

        thisCell.style.color = "black";
      } else {
        thisCell.style.color = "black";
        thisCell.style.backgroundColor = "#deae80";
      }
    }
  };
  forClosure(paintingForPositions);
}

function checknumber(id, val) {
  let idRow = id[0];
  let idCol = id[1];
  let thisblock = findIndexBox(idRow, idCol);

  let valueRow = row[idRow][idCol];
  if (valueRow == val) {
    console.log("TRUE!!!!");
    return true;
  }
  console.log("False! ;/");

  return false;
}

function eventKey() {
  document.addEventListener("keydown", function (event) {
    let thisCell, idarr;
    let val = event.key;
    let id = event.target.id;

    thisCell = document.getElementById(id);

    if (thisCell.class!== "true") {
  
    thisCell.value = "";

    idarr = id.split("");
    if (val !== "Tab") {
      paint(idarr, val);

      if (val >= 1 || val <= 9) {
        if (checknumber(idarr, val)) {
          console.log("bieeen");
          thisCell.style.color = "black";
          // thisCell.setAttribute("onclick", "paint("+id+"," + val + ")")
          thisCell.value = val;
          thisCell.readOnly = true;
          thisCell.class = "true";

          arrUser.push(val);
          console.log(arrUser);
          console.log(arrUser.length);
          isWinner(arrUser.length);
          // thisCell;
        } else {
          console.log("Oh no!");
          thisCell.style.color = "red";
          countError++;
          if (countError < 4) {
            console.log(countError);
            console.log(`${countError}/3`);
            var error = document.getElementById("error");
            error.innerText = `${countError}/3 errores`;
          } else {
            isntWinner();
          }
        }
      }
    }
  }
  });
}
function timeDom() {
  date = new Date(0);
  date.setSeconds(t); // specify value for SECONDS here
  var timeString = date.toISOString().substr(11, 8);
  console.log(timeString);
  document.getElementById("timer").innerHTML = timeString;
}

function pointsDom() {
  document.getElementById("points").innerHTML = (
    points * Math.pow(0.9971, t)
  ).toFixed(0);
}

function interval() {
  setInterval(
    function () {
      t++;
      timeDom();
      pointsDom();
    },
    1000,
    "JavaScript"
  );
}

function instructions(number) {
  let instruction = {
    0: "Este nivel es el más facil, sudoku 4x4, parte de 50 puntos.",
    1: "El nivel medio es una tabla 9x9 y parte de 4000 puntos.",
    2: "El nivel difícil es una tabla 9x9 y parte de 6000 puntos, se diferencia en tener un menor número mostrantes por defecto",
  };

  var instructions = document.getElementById("instructions");
  instructions.innerText = instruction[number];
  localStorage.setItem("level", number);
  document.getElementById("play").className = "";
}


function restart(){
  setTimeout(function () {
    location.reload()
  }, 5000);}

function isWinner() {
  console.log(arrUser.length, sudokuLength, sudokuLength * sudokuLength);

  if (arrUser.length === sudokuLength * sudokuLength){
    Swal.fire({
      icon: "success",
      title: "Enhorabuena, has ganado",
      text:`${document.getElementById("points").textContent} puntos`,
      showConfirmButton: false,
    });

    restart()}
}


function isntWinner() {
  Swal.fire({
    icon: "error",
    title: "Has hecho más de 3 fallos, deberías de jugar mejor",
    text: "Something went wrong!",
  });
  restart()
}

function play() {
  let config = {
    0: [4, 2, 50],
    1: [9, 2, 4000],
    2: [9, 4, 6000],
  };

  document.getElementById("menu").className = "d-none";
  document.getElementById("play").className = "d-none";
  document.getElementById("listGame").className = "";
  document.getElementById("restart").className = "";
  

  sudokuLength = config[localStorage.level][0];
  sudokuCellsRow = Math.sqrt(sudokuLength);
  difficult = config[localStorage.level][1];
  points = config[localStorage.level][2];
  console.log(sudokuLength);
  generateArrays();
  generateTable();
  eventKey();
  interval();
}

window.onload = () => {
  Swal.fire("¡Escoge un nivel!");
};
