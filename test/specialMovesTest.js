"use strict";

var ChessPiece = require('../ChessPiece')
    .ChessPiece

var movement = require('../services/Movement')
var specialMovement = require('../services/SpecialMovement')

const seneca = require('seneca')({
        log: 'silent'
    })
    .use(specialMovement)
    .use(movement);

var expect = require('chai')
    .expect;

describe('Pawn moves test', () => {
    it('Pe2 raw moves', function (done) {
        seneca.error(done)

        var p = new ChessPiece('Pe2');
        seneca.act({
            role: "movement",
            cmd: "rawMoves",
            piece: p,
            isPawn: true
        }, (err, msg) => {
            expect(msg)
                .to.include({
                    file: 'e',
                    rank: '3'
                });
            expect(msg)
                .to.include({
                    file: 'e',
                    rank: '4'
                })
            expect(msg)
                .not.include({
                    file: 'e',
                    rank: '1'
                })
            done();
        });
    });

    it('Pd3 raw moves', function (done) {
        seneca.error(done)

        var p = new ChessPiece('Pd4');
        seneca.act({
            role: "movement",
            cmd: "rawMoves",
            piece: p,
            isPawn: true
        }, (err, msg) => {
            expect(msg)
                .to.include({
                    file: 'd',
                    rank: '5'
                });
            expect(msg)
                .to.not.include({
                    file: 'd',
                    rank: '6'
                })
            expect(msg)
                .not.include({
                    file: 'e',
                    rank: '4'
                })
            done();
        });
    });
});

describe("Knight moves tests", () => {
    it('Nd4 raw moves', function (done) {
        seneca.error(done)

        var p = new ChessPiece('Nd4');
        seneca.act({
            role: "movement",
            cmd: "rawMoves",
            piece: p,
            isKnight: true
        }, (err, msg) => {
            console.log({
                msg
            })
            expect(msg)
                .to.include({
                    file: 'b',
                    rank: '3'
                });
            expect(msg)
                .to.include({
                    file: 'c',
                    rank: '6'
                });
            expect(msg)
                .to.include({
                    file: 'f',
                    rank: '3'
                })
            expect(msg)
                .not.include({
                    file: 'g',
                    rank: '4'
                })
            expect(msg)
                .to.have.lengthOf(8)
            done();
        });
    })

    it('Nb7 raw moves', function (done) {
        seneca.error(done)

        var p = new ChessPiece('Nb7');
        seneca.act({
            role: "movement",
            cmd: "rawMoves",
            piece: p,
            isKnight: true
        }, (err, msg) => {
            expect(msg)
                .to.include({
                    file: 'a',
                    rank: '5'
                });
            expect(msg)
                .to.include({
                    file: 'c',
                    rank: '5'
                });
            expect(msg)
                .to.include({
                    file: 'd',
                    rank: '6'
                })
            expect(msg)
                .not.include({
                    file: 'c',
                    rank: '4'
                })
            expect(msg)
                .to.have.lengthOf(8)
            done();
        });
    })
});

describe('Legal squares test', () => {
    it('Na1 legal squares', (done) => {
        seneca.error(done);

        var p = new ChessPiece('Na1');
        seneca.act({
            role: "movement",
            cmd: "legalSquares",
            piece: p
        }, (err, msg) => {
            console.log("Na1", {
                msg
            })
            expect(err)
                .to.be.null;
            expect(msg)
                .to.have.lengthOf(2)
            expect(msg)
                .to.include({
                    file: 'b',
                    rank: '3'
                });
            expect(msg)
                .to.include({
                    file: 'c',
                    rank: '2'
                })
            expect(msg)
                .not.include({
                    file: 'a',
                    rank: '3'
                });
            done();
        });
    });

    it('Nd4 legal squares', (done) => {
        seneca.error(done);

        var p = new ChessPiece('Nd4');
        seneca.act({
            role: "movement",
            cmd: "legalSquares",
            piece: p
        }, (err, msg) => {
            expect(err)
                .to.be.null;
            expect(msg)
                .to.have.lengthOf(8)
            expect(msg)
                .to.include({
                    file: 'e',
                    rank: '2'
                });
            expect(msg)
                .to.include({
                    file: 'c',
                    rank: '6'
                })
            expect(msg)
                .not.include({
                    file: 'd',
                    rank: '4'
                });
            done();
        });
    });

});
