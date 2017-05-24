'use strict';

module.exports = function placement(options) {
    this.add({
        role: "placement",
        cmd: "position"
    })


    this.add({
        role: "placement",
        cmd: "piece"
    }, (msg, reply) => {
        if (msg.position.file < 'a' || msg.position.file > 'h') {
            reply(null, {
                success: false,
                error: "invalid file"
            });
        }
        if (msg.position.rank < 1 || msg.position.rank > 8) {
            reply(null, {
                success: false,
                error: "invalid rank"
            });
        }
        if (msg.piece === 'P' && msg.position.rank < 2) {
            reply(null, {
                success: false,
                error: "pawns cannot be on first rank"
            });
        }

        reply(null, {
            success: true,
            piece: msg.piece
        });

    })

}
