import {
    toggleSingleBit
} from '@/model/Bitwise/ToggleBit.js'

describe("test", () => {
    it("3999 in decimal, feed into function with index param of 1, will return [2975,'101110011111']", () => {
        expect(toggleSingleBit(3999, 1)).toStrictEqual([2975, '101110011111'])
    })
})