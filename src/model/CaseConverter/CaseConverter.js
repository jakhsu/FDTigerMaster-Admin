export function camel2Snake(string) {
    const regex = /[A-Z]/;
    const modifiedString = string.replace(regex, function (match) {
        return "_" + match.toLowerCase();
    })
    return modifiedString
}