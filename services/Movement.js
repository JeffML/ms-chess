module.exports = function movement(options) {
    function diagonal(position, range = 7) {
        var moves = [];
        const cFile = position.file.charCodeAt()
        const cRank = position.rank.charCodeAt();

        for (var i = 1; i < range + 1; i++) {
            moves.push({
                file: String.fromCharCode(cFile - i),
                rank: String.fromCharCode(cRank - i)
            });
            moves.push({
                file: String.fromCharCode(cFile + i),
                rank: String.fromCharCode(cRank + i)
            });
            moves.push({
                file: String.fromCharCode(cFile - i),
                rank: String.fromCharCode(cRank + i)
            });
            moves.push({
                file: String.fromCharCode(cFile + i),
                rank: String.fromCharCode(cRank - i)
            });
        }
        return moves;
    }

    function rankAndFile(position, range = 7) {
        var moves = [];
        const cFile = position.file.charCodeAt()
        const cRank = position.rank.charCodeAt();

        for (var i = 1; i < range + 1; i++) {
            moves.push({
                file: String.fromCharCode(cFile - i),
                rank: String.fromCharCode(cRank)
            });
            moves.push({
                file: String.fromCharCode(cFile),
                rank: String.fromCharCode(cRank + i)
            });
            moves.push({
                file: String.fromCharCode(cFile + i),
                rank: String.fromCharCode(cRank)
            });
            moves.push({
                file: String.fromCharCode(cFile),
                rank: String.fromCharCode(cRank - i)
            });
        }
        return moves;
    }

    this.add({
        role: "movement",
        cmd: "rawMoves",
    }, (msg, reply) => {
        var rawMoves = [];

        var pos = msg.piece.position;

        switch (msg.piece.piece) {
        case 'R':
            rawMoves = rankAndFile(pos);
            break;
        case 'B':
            rawMoves = diagonal(pos);
            break;
        case 'Q':
            rawMoves = rankAndFile(pos)
                .concat(diagonal(pos));
            break;
        case 'K':
            rawMoves = rankAndFile(pos, 1)
                .concat(diagonal(pos, 1))
            break;
        default:
            rawMoves = []; //Error: unhandled by this service
            break;
        };

        reply(null, rawMoves);
    });

    this.add({
        role: "movement",
        cmd: "legalSquares",
    }, (msg, reply) => {
        this.act({
            role: "movement",
            cmd: "rawMoves",
            piece: msg.piece
        }, (err, msg) => {
            const squared = [];

            msg.forEach((move) => {
                if (move.file >= 'a' && move.file <= 'h') {
                    if (move.rank >= 1 && move.rank <= 8) {
                        squared.push(move)
                    }
                }
            })

            reply(null, squared);
        });
    })
};
