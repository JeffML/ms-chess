"use strict";

var seneca = require('seneca')()
var ChessPiece = require('./ChessPiece')
    .ChessPiece;

seneca.add('role:setup,cmd:position', (msg, reply) => {
    try {
        var cp = new ChessPiece(msg.notation);
        reply(null, {
            cp
        })
    } catch (e) {
        reply(e);
    }

})

seneca.act({
    role: 'setup',
    cmd: 'position',
    notation: 'Ka1'
}, function (err, result) {
    if (err) return console.error(err)
    console.log("cp.denote():", result.cp.denote())
})
