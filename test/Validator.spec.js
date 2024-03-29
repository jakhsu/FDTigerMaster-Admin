import * as validator from '@/model/Validator/Validator.js'

describe('test all validators', () => {
    it('test empty validator', () => {
        expect(validator.isEmpty("")).toBe(true)
        expect(validator.isEmpty("some input")).toBe(false)
        expect(validator.isEmpty(123)).toBe(false)
        expect(validator.isEmpty()).toBe(true)
    })
    it('test number validator', () => {
        expect(validator.isNum(123)).toBe(true)
        expect(validator.isNum("text")).toBe(false)
        expect(validator.isNum("")).toBe(false)
    })
    it('test skill id validator', () => {
        expect(validator.validateSkillId("TM-X010100")).toBe(true)
        expect(validator.validateSkillId("TM-X010")).toBe(false)
        expect(validator.validateSkillId(123)).toBe(false)
    })
    it('test working_category validator', () => {
        expect(validator.validateWorkingCategoryId("TM-X010100")).toBe(false)
        expect(validator.validateWorkingCategoryId("TM-X010")).toBe(false)
        expect(validator.validateWorkingCategoryId(123)).toBe(false)
        expect(validator.validateWorkingCategoryId("TM-X010101")).toBe(true)
        expect(validator.validateWorkingCategoryId("TM-X010103")).toBe(true)
    })
    it('test TW phone number validator', () => {
        expect(validator.validateTWPhoneNum('0912345678')).toBe(true)
        expect(validator.validateTWPhoneNum('091234567899')).toBe(false)
        expect(validator.validateTWPhoneNum('09123499')).toBe(false)
    })
    it('test email validator', () => {
        expect(validator.validateEmail("correctEmail@gmail.com")).toBe(true)
        expect(validator.validateEmail("correctEmail.gmail.com")).toBe(false)
        expect(validator.validateEmail("correctEmail@gmail")).toBe(false)
    })
})