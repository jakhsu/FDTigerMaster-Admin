const add = require('./add');
const expect = require('chai').expect;

describe('測試add函數', () => {
    it('測試5+5預期10', () => {
        expect(add(5, 5)).to.be.equal(10);
    }).timeout(500);
    it('測試5+15預期20', () => {
        expect(add(5, 15)).to.be.equal(20);
    }).timeout(500);
});