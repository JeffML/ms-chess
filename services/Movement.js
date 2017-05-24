module.exports = function movement(options) {
    function diagonal(position) {
        var moves = [];
        const cFile = position.file.charCodeAt()
        const cRank = position.rank.charCodeAt();

        for (var i = 1; i < 8; i++) {
            moves.push({
                file: String.fromCharCode(cFile - i),
                rank: String.fromCharCode(cRank - i)
            });
            moves.push({
                file: String.fromCharCode(cFile + i),
                rank: String.fromCharCode(cRank + i)
            });
        }
        return moves;
    }

    function rankAndFile(position) {
        var moves = [];

        for (var file = (-7); file < 8; file++) {
            if (file !== 0) {
                var f = position.file - file;
                moves.push({
                    file: f,
                    rank: position.rank
                })
            }

            for (var rank = (-7); rank < 8; rank++) {
                if (rank !== 0) {
                    var r = position.rank - rank;
                    moves.push({
                        file: position.file,
                        rank: r
                    })
                }
            }
        }
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
            rawMoves = rankAndFile(pos) + diagonal(pos);
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
