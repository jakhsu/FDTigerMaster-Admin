const add = require("./add");
const expect = require("chai").expect;

describe("測試add函數", () => {
    test('5+5預期: 10', () => {
        expect(add(5, 5)).to.be.equal(10);
    }, 500);
    test('測試5+15預期20', () => {
        expect(add(5, 15)).to.be.equal(20);
    }, 500);
})