class Tile {
  constructor(letter) {
    this.letter = letter;
    this.value = points[letter];
  }

  getValue() {
    return points[this.letter];
  }
}

class Square {
  constructor(type = "  ") {
    this.type = type;
  }

  setTile(tile) {
    this.tile = tile;
  }

  getType() {
    return this.type;
  }

  getLetter() {
    if(this.tile) return this.tile.letter;
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
}

const tileBag = R.compose(
  R.flatten,
  R.map(([letter, count]) => R.times(() => new Tile(letter), count)),
  R.toPairs
)(lettersDistribution);

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
