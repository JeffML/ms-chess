var ChessPiece = require('../index.js')
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
})
