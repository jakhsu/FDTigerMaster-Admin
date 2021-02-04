import RoleIdMap from '@/model/Mapping/RoleIdMap.js'

const roleIdMap = RoleIdMap();

describe('test role id mapping', () => {
    it("0 => 師傅", () => {
        expect(roleIdMap[0]).toBe("師傅");
    })
    it("1 => 一般客戶", () => {
        expect(roleIdMap[0]).toBe("師傅");
    })
    it("2 => 企業用戶", () => {
        expect(roleIdMap[0]).toBe("師傅");
    })
    it("70 => 行銷", () => {
        expect(roleIdMap[0]).toBe("師傅");
    })
    it("80 => 財務", () => {
        expect(roleIdMap[0]).toBe("師傅");
    })
    it("90 => 客服", () => {
        expect(roleIdMap[0]).toBe("師傅");
    })
    it("999 => 超級使用者", () => {
        expect(roleIdMap[0]).toBe("師傅");
    })
    it("illegal input => undefined", () => {
        expect(roleIdMap[undefined]).toBe(undefined);
    })
})