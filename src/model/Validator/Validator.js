import {
    skillIdReg,
    workingCategoryIdReg
} from '@/model/Regex/Regex.js'

export function isEmpty(input = "") {
    return input == ''
}
export function isNum(input) {
    return !isNaN(input) && input !== ''
}
export function validateSkillId(input) {
    return skillIdReg().test(input)
}
export function validateWorkingCategoryId(input) {
    return workingCategoryIdReg().test(input)
}