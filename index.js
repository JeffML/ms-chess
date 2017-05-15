'use strict';

var seneca = require('seneca')()


const pieces = [
    'K',
    'Q',
    'R',
    'B',
    'N',
    'P'];


class ChessPiece {
    constructor(notation) {
        const piece = notation[0];
        const file = notation[1];
        const rank = notation[2];

        if (!pieces.includes(piece)) {
            throw Error("invalid piece", piece);
        }
        if (file < 'a' || file > 'h') {
            throw Error("invalid file", file)
        }
        if (rank < 1 || rank > 8) {
            throw Error("invalid rank", rank)
        }
        this.piece = piece;
        this.position = {
            file,
            rank
        }
    }
    denote() {
        return this.piece + this.position.file + this.position.rank;
    }
}

module.exports = {
    pieces,
    ChessPiece
}
