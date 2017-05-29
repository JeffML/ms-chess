module.exports = function specialMovement(options) {
    function pawnMoves(position) {
        const cFile = position.file.charCodeAt()
        const cRank = position.rank.charCodeAt();

        var rawMoves = [
            {
                file: String.fromCharCode(cFile),
                rank: String.fromCharCode(cRank + 1)
            }];

        if (position.rank == 2) {
            rawMoves.push({
                file: String.fromCharCode(cFile),
                rank: String.fromCharCode(cRank + 2)
            })
        }

        return rawMoves;
    }

    function knightMoves(position) {
        const cFile = position.file.charCodeAt()
        const cRank = position.rank.charCodeAt();

        var rawMoves = [];

        [-2, 2].forEach(i => {
            [-1, 1].forEach(j => {
                rawMoves.push({
                    file: String.fromCharCode(cFile + i),
                    rank: String.fromCharCode(cRank + j)
                });
                rawMoves.push({
                    file: String.fromCharCode(cFile + j),
                    rank: String.fromCharCode(cRank + i)
                })
            });
        });

        return rawMoves;
    }

    this.add({
        role: "movement",
        cmd: "rawMoves",
        isPawn: true
    }, (msg, reply) => {
        var pos = msg.piece.position;

        const rawMoves = pawnMoves(pos);
        reply(null, rawMoves);
    });

    this.add({
        role: "movement",
        cmd: "rawMoves",
        isKnight: true
    }, (msg, reply) => {
        if (msg.piece.piece !== 'N') {
            return ("piece was not a knight")
        }

        var rawMoves = [];
        var pos = msg.piece.position;

        rawMoves = knightMoves(pos);
        reply(null, rawMoves);
    });
}
