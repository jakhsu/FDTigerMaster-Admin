export function toggleSingleBit(inputNum, index) {
    let originalBinary = inputNum.toString(2)
    let newChar
    if (originalBinary.charAt(index) === '0') {
        newChar = "1"
    } else {
        newChar = "0"
    }
    let modifiedBinary = originalBinary.substring(0, index) + newChar + originalBinary.substring(index + 1)
    let outputNum = parseInt(modifiedBinary, 2)
    return [outputNum, modifiedBinary]
}