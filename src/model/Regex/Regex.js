export function skillIdReg() {
    return /^TM-[A-Z]{1}[0-9]{4}00$/
}
export function workingCategoryIdReg() {
    return /^TM-[A-Z]{1}[0-9]{4}[0-9]{2}(?<!00)$/
}
export function TWPhoneReg() {
    return /^09[0-9]{8}$/
}
export function emailReg() {
    return /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
}