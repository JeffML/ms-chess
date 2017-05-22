"use strict";

var ChessPiece = require('../ChessPiece')
    .ChessPiece

var expect = require('chai')
    .expect;

describe('Legal Pieces test', () => {
    it('Ka1', () => {
        var ka1 = new ChessPiece('Ka1');
        expect(ka1)
            .to.have.all.keys('piece', 'position');
        expect(ka1)
            .to.have.property('piece', 'K');
        expect(ka1.position)
            .to.have.property('file', 'a');
        expect(ka1.position)
            .to.have.property('rank', '1')
    });
    it('Pa2', () => {
        var pa2 = new ChessPiece('Pa2');
        expect(pa2)
            .to.have.all.keys('piece', 'position');
        expect(pa2)
            .to.have.property('piece', 'P');
        expect(pa2.position)
            .to.have.property('file', 'a');
        expect(pa2.position)
            .to.have.property('rank', '2')
    })
})

describe('Illegal Pieces test', () => {
    it('Qa9', () => {
        expect(() => new ChessPiece('Qa9'))
            .to.throw('invalid rank');
    });
    it('Qr1', () => {
        expect(() => new ChessPiece('Qr1'))
            .to.throw('invalid file');
    });
    it('Ma1', () => {
        expect(() => new ChessPiece('Ma1'))
            .to.throw('invalid piece');
    });
    it('Pa1', () => {
        expect(() => new ChessPiece('Pa1'))
            .to.throw('pawns cannot be on first rank');
    });
});
