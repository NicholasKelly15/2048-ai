class Board {
    constructor() {
        this.board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    }

    countTilesLeft(position) {
        let count = 0
        for (let i = position[1] - 1 ; i >= 0 ; i--) {
            if (this.board[position[0]][i]) {
                count++
            }
        }
        return count
    }

    countTilesRight(position) {
        let count = 0
        for (let i = position[1] + 1 ; i < 4 ; i++) {
            if (this.board[position[0]][i]) {
                count++
            }
        }
        return count
    }

    countTilesBelow(position) {
        let count = 0
        for (let i = position[0] + 1 ; i < 4 ; i++) {
            if (this.board[i][position[1]]) {
                count++
            }
        }
        return count
    }

    countTilesAbove(position) {
        let count = 0
        for (let i = position[0] - 1 ; i >= 0 ; i--) {
            if (this.board[i][position[1]]) {
                count++
            }
        }
        return count
    }

    mergeLeft() {
        for (let row = 0 ; row < 4 ; row++) {
            for (let column = 0 ; column < 4 ; column++) {
                if (this.board[row][column] === this.board[row][column + 1]) {
                    this.board[row][column] *= 2
                    for (let c = column + 1 ; c < 3 ; c++) {
                        this.board[row][c] = this.board[row][c + 1]
                    }
                }
            }
        }
    }

    mergeDown() {
        for (let row = 0 ; row < 4 ; row++) {
            for (let column = 0 ; column < 4 ; column++) {
                if (this.board[row][column] === this.board[row][column + 1]) {
                    this.board[row][column] *= 2
                    for (let c = column + 1 ; c < 3 ; c++) {
                        this.board[row][c] = this.board[row][c + 1]
                    }
                }
            }
        }
    }

    mergeRight() {
        for (let row = 0 ; row < 4 ; row++) {
            for (let column = 0 ; column < 4 ; column++) {
                if (this.board[row][column] === this.board[row][column + 1]) {
                    this.board[row][column] *= 2
                    for (let c = column + 1 ; c < 3 ; c++) {
                        this.board[row][c] = this.board[row][c + 1]
                    }
                }
            }
        }
    }

    mergeUp() {
        for (let row = 0 ; row < 4 ; row++) {
            for (let column = 0 ; column < 4 ; column++) {
                if (this.board[row][column] === this.board[row][column + 1]) {
                    this.board[row][column] *= 2
                    for (let c = column + 1 ; c < 3 ; c++) {
                        this.board[row][c] = this.board[row][c + 1]
                    }
                }
            }
        }
    }

    // direction: 0 = left, 1 = down, 2 = right, 3 = up
    move(direction) {
        let newBoard = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        for (let i = 0 ; i < 4 ; i++) {
            for (let j = 0 ; j < 4 ; j++) {
                if (this.board[i][j] !== 0) {
                    let newPosition = [0, 0]
                    if (direction === 0) {
                        newPosition = [i, this.countTilesLeft([i, j])]
                    } else if (direction === 2) {
                        newPosition = [i, 3 - this.countTilesRight([i, j])]
                    } else if (direction === 1) {
                        newPosition = [3 - this.countTilesBelow([i, j]), i]
                    } else if (direction === 3) {
                        newPosition = [this.countTilesAbove([i, j]), i]
                    }
                    console.log(newPosition)
                    newBoard[newPosition[0]][newPosition[1]] = this.board[i][j]
                }
            }
        }
        this.board = newBoard
        if (direction === 0) {
            this.mergeLeft()
        } else if (direction === 1) {
            this.mergeDown()
        } else if (direction === 2) {
            this.mergeRight()
        } else if (direction === 3) {
            this.mergeUp()
        }
        this.addRandomTile()
    }

    addRandomTile() {

    }
}

board = new Board()
board.board[0][1] = 2
board.board[0][2] = 2
board.board[0][3] = 4