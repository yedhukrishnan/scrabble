scrabbleBoard = new ScrabbleBoard(boardLayout);
scrabbleBoard.board[0][5].setTile(tileBag.pop());
scrabbleBoard.board[3][10].setTile(tileBag.pop());

const printBoard = (scrabbleBoard) => {
  var table = R.compose(
    R.join("\n"),
    R.prepend("<table>"),
    R.append("</table>"),
    R.map(
      R.compose(
        R.join("\n"),
        R.prepend("<tr>"),
        R.append("</tr>"),
        R.map((square) => {
          const type = square.type.trim();
          const letter = square.getLetter();
          return `<td class="${letter ? "tile" : R.toLower(type)}">${
            letter ? letter : type
          }</td>`;
        })
      )
    )
  )(scrabbleBoard.board);

  console.log(table);

  $(".scrabble-board").append(table);
};

console.log(scrabbleBoard);
printBoard(scrabbleBoard);
