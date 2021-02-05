import * as regex from '@/model/Regex/Regex.js'

export function isEmpty(input = "") {
    return input == ''
}
export function isNum(input) {
    return !isNaN(input) && input !== ''
}
export function validateSkillId(input) {
    return regex.skillIdReg().test(input)
}
export function validateWorkingCategoryId(input) {
    return regex.workingCategoryIdReg().test(input)
}
export function validateTWPhoneNum(input) {
    return regex.TWPhoneReg().test(input)
}
export function validateEmail(input) {
    return regex.emailReg().test(input)
}