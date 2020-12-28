export function stringToArray(string = '', seperator = ',') {
    let array = string.split(`${seperator}`);
    array.filter((element) => element != `${seperator}`);
    return array;
}