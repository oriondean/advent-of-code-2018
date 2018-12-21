class Cart {
  constructor(initialDirection, x, y) {
    this.direction = initialDirection;
    this.x = x;
    this.y = y;
    this.trackUnderneath = initialDirection === '>' || initialDirection === '<' ? '-' : '|';
    this.lastTurning = 'right';
  }

  turnLeft() {
    switch (this.direction) {
      case '^':
        return '<';
      case '>':
        return '^';
      case 'v':
        return '>';
      case '<':
      default:
        return 'v';
    }
  }

  turnRight() {
    switch (this.direction) {
      case '^':
        return '>';
      case '>':
        return 'v';
      case 'v':
        return '<';
      case '<':
      default:
        return '^';
    }
  }

  getNextPosition() {
    switch (this.direction) {
      case '^':
        return [this.x, this.y - 1];
      case '>':
        return [this.x + 1, this.y];
      case 'v':
        return [this.x, this.y + 1];
      case '<':
        return [this.x - 1, this.y];
      default:
        return [this.x, this.y];
    }
  }

  updateDirection(nextTrackPiece) {
    if (nextTrackPiece === '/') {
      this.direction = this.direction === '^' || this.direction === 'v' ? this.turnRight() : this.turnLeft();
    } else if (nextTrackPiece === '\\') {
      this.direction = this.direction === '^' || this.direction === 'v' ? this.turnLeft() : this.turnRight();
    } else if (nextTrackPiece === '+') {
      if (this.lastTurning === 'straight') {
        this.direction = this.turnRight();
      } else if (this.lastTurning === 'right') {
        this.direction = this.turnLeft();
      }
      this.updateLastTurning();
    }
  }

  updateLastTurning() {
    switch (this.lastTurning) {
      case 'left':
        this.lastTurning = 'straight';
        break;
      case 'straight':
        this.lastTurning = 'right';
        break;
      case 'right':
      default:
        this.lastTurning = 'left';
    }
  }

  isAtPosition(x, y) {
    return this.x === x && this.y === y;
  }

  move(nextTrackPiece) {
    [this.x, this.y] = this.getNextPosition();
    this.updateDirection(nextTrackPiece);

    this.trackUnderneath = nextTrackPiece;

    return this.direction;
  }
}

module.exports = Cart;
