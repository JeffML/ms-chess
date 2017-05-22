'use strict';
const placement = require('./services/Placement')
const seneca = require('seneca')

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

        this.piece = piece;
        this.position = {
            file,
            rank
        }
    }

    isLegal(cb) {
        seneca.use(placement)
            .act({
                role: "placement",
                cmd: "check",
                piece: this.piece,
                position: this.position
            }, (err, result) => {
                if (err) cb(err);
                cb(result.error, result.success)
            });
    }


    denote() {
        return this.piece + this.position.file + this.position.rank;
    }
}

module.exports = {
    pieces,
    ChessPiece
}
