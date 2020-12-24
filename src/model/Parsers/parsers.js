export function stringToArray(string, seperator) {
    string = string || '';
    seperator = seperator || '';
    let array = string.split(`${seperator}`);
    array.filter((element) => element != `${seperator}`);
    return array;
}