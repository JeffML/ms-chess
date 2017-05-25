"use strict";

var ChessPiece = require('../ChessPiece')
    .ChessPiece

var movement = require('../services/Movement')

const seneca = require('seneca')({
        log: 'silent'
    })
    .use(movement);

var expect = require('chai')
    .expect;

describe('Raw moves test', () => {
    it('Ba1 raw moves', function (done) {
        seneca.error(done)

        var Ba1 = new ChessPiece('Ba1');
        seneca.act({
            role: "movement",
            cmd: "rawMoves",
            piece: Ba1
        }, (err, msg) => {
            expect(msg)
                .to.include({
                    file: 'b',
                    rank: '2'
                });
            expect(msg)
                .to.include({
                    file: 'h',
                    rank: '8'
                })
            expect(msg)
                .not.include({
                    file: 'a',
                    rank: '1'
                })
            expect(msg)
                .to.have.length.above(7)
            done();
        });
    });

    it('Rd4 raw moves', function (done) {
        seneca.error(done)

        var Rd4 = new ChessPiece('Rd4');
        seneca.act({
            role: "movement",
            cmd: "rawMoves",
            piece: Rd4
        }, (err, msg) => {
            expect(msg)
                .to.include({
                    file: 'd',
                    rank: '2'
                });
            expect(msg)
                .to.include({
                    file: 'd',
                    rank: '8'
                })
            expect(msg)
                .not.include({
                    file: 'd',
                    rank: '4'
                })
            expect(msg)
                .to.have.length.above(14)
            done();
        });
    });

    it('Qb7 raw moves', function (done) {
        seneca.error(done)

        var p = new ChessPiece('Qb7');
        seneca.act({
            role: "movement",
            cmd: "rawMoves",
            piece: p
        }, (err, msg) => {
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
                    file: 'd',
                    rank: '5'
                })
            expect(msg)
                .not.include({
                    file: 'g',
                    rank: '4'
                })
            expect(msg)
                .to.have.length.above(14)
            done();
        });
    })

    it('Kb7 raw moves', function (done) {
        seneca.error(done)

        var p = new ChessPiece('Kb7');
        seneca.act({
            role: "movement",
            cmd: "rawMoves",
            piece: p
        }, (err, msg) => {
            expect(msg)
                .to.include({
                    file: 'b',
                    rank: '8'
                });
            expect(msg)
                .to.include({
                    file: 'c',
                    rank: '6'
                });
            expect(msg)
                .to.include({
                    file: 'a',
                    rank: '7'
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
    it('Ba1 legal squares', (done) => {
        seneca.error(done);

        var Ba1 = new ChessPiece('Ba1');
        seneca.act({
            role: "movement",
            cmd: "legalSquares",
            piece: Ba1
        }, (err, msg) => {
            expect(err)
                .to.be.null;
            expect(msg)
                .to.have.lengthOf(7)
            expect(msg)
                .to.include({
                    file: 'b',
                    rank: '2'
                });
            expect(msg)
                .to.include({
                    file: 'h',
                    rank: '8'
                })
            expect(msg)
                .not.include({
                    file: 'a',
                    rank: '1'
                });
            done();
        });
    });

    it('Rd4 legal squares', (done) => {
        seneca.error(done);

        var p = new ChessPiece('Rd4');
        seneca.act({
            role: "movement",
            cmd: "legalSquares",
            piece: p
        }, (err, msg) => {
            expect(err)
                .to.be.null;
            expect(msg)
                .to.have.lengthOf(14)
            expect(msg)
                .to.include({
                    file: 'd',
                    rank: '2'
                });
            expect(msg)
                .to.include({
                    file: 'h',
                    rank: '4'
                })
            expect(msg)
                .not.include({
                    file: 'e',
                    rank: '5'
                });
            done();
        });
    });

});
