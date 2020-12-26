scrabbleBoard = new ScrabbleBoard(boardLayout);

const printBoard = (scrabbleBoard) => {
  var table = R.compose(
    R.join("\n"),
    R.prepend("<table>"),
    R.append("</table>"),
    R.addIndex(R.map)((squareRow, row) =>
      R.compose(
        R.join("\n"),
        R.prepend("<tr>"),
        R.append("</tr>"),
        R.addIndex(R.map)((square, col) => {
          const type = square.type.trim();
          const letter = square.getLetter();
          return [
            `<td`,
            `class="square ${letter ? "tile" : R.toLower(type)}"`,
            `data-row=${row}`,
            `data-col=${col}`,
            `>`,
            `${letter ? letter : type == "ST" ? "☆" : type}`,
            `</td>`,
          ].join(" ");
        })
      )(squareRow)
    )
  )(scrabbleBoard.board);

  $(".scrabble-board").html(table);
};

printBoard(scrabbleBoard);

const updateMyTiles = () => {
  R.times(() => myTiles.push(tileBag.pop()), 7);
  myTilesCopy = [...myTiles];
};

const printMyTiles = () => {
  var tiles = R.compose(
    R.join("\n"),
    R.prepend("<table>"),
    R.append("</table>"),
    R.addIndex(R.map)(
      (tile, position) =>
        `<th class="my-tile" data-position=${position}>${
          tile ? tile.getLetter() : ""
        }</th>`
    )
  )(myTilesCopy);

  $(".my-tiles").html(tiles);
};

updateMyTiles();
printMyTiles();

const resetTurn = () => {
  myTilesCopy = [...myTiles];
  printMyTiles();
  scrabbleBoard.resetTurn();
  printBoard(scrabbleBoard);
};

const submit = () => {
  scrabbleBoard.finishTurn();
  myTiles = [...myTilesCopy];
  for (var i = 0; i < 7; i++) {
    if (!myTiles[i]) myTiles[i] = tileBag.pop();
  }

  myTilesCopy = [...myTiles];
  printBoard(scrabbleBoard);
  printMyTiles();
};

$(".scrabble-board").on("click", ".square", (event) => {
  const row = $(event.target).data("row");
  const col = $(event.target).data("col");
  if (scrabbleBoard.isEmpty(row, col)) {
    scrabbleBoard.putTile(row, col, selectedTile);
    selectedTile = null;
    myTilesCopy[selectedTilePosition] = null;
    selectedTilePosition = null;
    printBoard(scrabbleBoard);
    printMyTiles();
  }
});

$(".my-tiles").on("click", ".my-tile", (event) => {
  const position = $(event.target).data("position");
  selectedTile = myTilesCopy[position];
  selectedTilePosition = position;
});
