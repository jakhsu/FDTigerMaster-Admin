import regex from './regex'

export default function (inputType, input) {
    return regex(inputType).test(input)
}