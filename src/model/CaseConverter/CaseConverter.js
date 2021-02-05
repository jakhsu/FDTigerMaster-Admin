export function camel2Snake(string = "") {
    const regex = /[A-Z]/g;
    const modifiedString = string.replace(regex, function (match) {
        return "_" + match.toLowerCase();
    })
    return modifiedString
}