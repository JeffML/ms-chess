"use strict";

var ChessPiece = require('../ChessPiece')
    .ChessPiece

var movement = require('../services/Movement')

var expect = require('chai')
    .expect;

describe('Raw moves test', () => {
    it('Ba1 raw moves', function (done) {
        const seneca = require('seneca')({
                log: 'silent'
            })
            .error(done)
            .use(movement);

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
        })
    })
});

describe('Legal squares test', () => {
    it('Ba1 legal squares', (done) => {
        const seneca = require('seneca')({
                log: 'silent'
            })
            .error(done)
            .use(movement);

        var Ba1 = new ChessPiece('Ba1');
        seneca.act({
            role: "movement",
            cmd: "legalSquares",
            piece: Ba1
        }, (err, msg) => {
            console.log(msg)
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
});
