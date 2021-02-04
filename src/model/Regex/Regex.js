export function skillIdReg() {
    return /^TM-[A-Z]{1}[0-9]{4}00$/
}
export function workingCategoryIdReg() {
    return /^TM-[A-Z]{1}[0-9]{4}[0-9]{2}(?<!00)$/
}