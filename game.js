class Board {
    constructor() {
        this.board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        this.tile_container = document.getElementsByClassName("tile-container")[0]
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
            for (let column = 0 ; column < 3 ; column++) {
                if (this.board[row][column] === this.board[row][column + 1]) {
                    this.board[row][column] *= 2
                    for (let c = column + 1 ; c < 3 ; c++) {
                        this.board[row][c] = this.board[row][c + 1]
                    }
                    this.board[row][3] = 0
                }
            }
        }
    }

    mergeDown() {
        for (let column = 0 ; column < 4 ; column++) {
            for (let row = 3 ; row > 0 ; row--) {
                if (this.board[row][column] === this.board[row - 1][column]) {
                    this.board[row][column] *= 2
                    for (let r = row - 1 ; r > 0 ; r--) {
                        this.board[r][column] = this.board[r - 1][column]
                    }
                    this.board[0][column] = 0
                }
            }
        }
    }

    mergeRight() {
        for (let row = 0 ; row < 4 ; row++) {
            for (let column = 3 ; column > 0 ; column--) {
                if (this.board[row][column] === this.board[row][column - 1]) {
                    this.board[row][column] *= 2
                    for (let c = column - 1 ; c > 0 ; c--) {
                        this.board[row][c] = this.board[row][c - 1]
                    }
                    this.board[row][0] = 0
                }
            }
        }
    }

    mergeUp() {
        for (let column = 0 ; column < 4 ; column++) {
            for (let row = 0 ; row < 3 ; row++) {
                if (this.board[row][column] === this.board[row + 1][column]) {
                    this.board[row][column] *= 2
                    for (let r = row + 1 ; r < 3 ; r++) {
                        this.board[r][column] = this.board[r + 1][column]
                    }
                    this.board[3][column] = 0
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
                        newPosition = [3 - this.countTilesBelow([i, j]), j]
                    } else if (direction === 3) {
                        newPosition = [this.countTilesAbove([i, j]), j]
                    }
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

    clearHTMLBoard() {
        let tile_container = document.getElementsByClassName("tile-container")[0]
        tile_container.innerHTML = ""
    }

    printTileAtPosition(position, tileNumber) {
        let tile = document.createElement("div")
        let numberClass = 'tile-' + tileNumber
        let positionClass = 'tile-pos-' + position[0] + '-' + position[1]
        tile.setAttribute('class', 'tile ' + numberClass + ' ' + positionClass)
        tile.textContent = tileNumber
        let tile_container = document.getElementsByClassName("tile-container")[0]
        tile_container.appendChild(tile)
    }

    printHTML() {
        this.clearHTMLBoard()
        for (let i = 0 ; i < 4 ; i++) {
            for (let j = 0 ; j < 4 ; j++) {
                if (this.board[i][j] !== 0) {
                    this.printTileAtPosition([i, j], this.board[i][j])
                }
            }
        }
    }
}

board = new Board()
board.board = [
    [0, 2, 2, 4], 
    [2, 2, 2, 2], 
    [4, 2, 2, 8], 
    [2, 4, 8, 4]
]