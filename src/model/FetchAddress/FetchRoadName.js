import * as xmljs from 'xml-js'
import * as iconv from 'iconv-lite'

export async function fetchRoadName(city, area) {
    const result = await fetch(
        `https://cors-anywhere.herokuapp.com/https://www.post.gov.tw/post/streetNameData?city=${city}&cityarea=${area}`, {
            method: "POST"
        });
    const buffer = await result.arrayBuffer();
    const text = iconv.decode(new Buffer(buffer), 'Big5');
    const converted = xmljs.xml2js(text, {
        compact: true,
        spaces: 4
    });
    const streets = Object.values(converted.street.road_name).map(
        item => item["_text"]
    );
    return streets.filter(item => item != null)
}