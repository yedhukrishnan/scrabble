class Tile {
  constructor(letter) {
    this.letter = letter;
    this.value = points[letter];
  }

  getLetter() {
    return this.letter;
  }

  getValue() {
    return points[this.letter];
  }
}

class Square {
  constructor(type = "  ") {
    this.type = type;
    this.fixed = false;
    this.tile = null;
  }

  setTile(tile) {
    this.tile = tile;
  }

  getType() {
    return this.type;
  }

  getLetter() {
    if (this.tile) return this.tile.letter;
  }

  isEmpty() {
    return !this.tile;
  }

  clearTile() {
    if (this.tile && !this.tile.fixed) this.tile = null;
  }

  fixTile() {
    if (this.tile) this.tile.fixed = true;
  }

  getPoints() {
    switch (this.type) {
      case "DL":
        return this.tile.value * 2;
      case "TL":
        return this.tile.value * 3;
      case "  ":
        return this.tile.value;
    }
  }
}

class ScrabbleBoard {
  constructor(boardLayout) {
    this.board = R.map(R.map((type) => new Square(type)))(boardLayout);
  }

  resetTurn() {
    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 15; j++) {
        this.board[i][j].clearTile();
      }
    }
  }

  finishTurn() {
    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 15; j++) {
        this.board[i][j].fixTile();
      }
    }
  }

  isEmpty(row, col) {
    return this.board[row][col].isEmpty()
  }

  putTile(row, col, tile) {
    this.board[row][col].setTile(tile)
  }
}

var tileBag = R.compose(
  R.flatten,
  R.map(([letter, count]) => R.times(() => new Tile(letter), count)),
  R.toPairs
)(lettersDistribution);

var myTiles = [];
var selectedTile = null;
var selectedTilePosition = null;
var myTilesCopy = [];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

tileBag = shuffle(tileBag);

//const popFromTileBag = () => {
//const tile = tileBag.pop();
//tileBag = shuffle(tileBag)
//}
