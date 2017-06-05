module.exports = function diagonal(position, range = 7) {
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
