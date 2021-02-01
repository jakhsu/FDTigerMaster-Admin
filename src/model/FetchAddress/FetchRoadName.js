import * as xmljs from 'xml-js'
import * as iconv from 'iconv-lite'
import * as fetch from 'node-fetch'

export async function fetchRoadName(city, area) {
    const codedCity = encodeURI(city);
    const codedArea = encodeURI(area);
    console.log(codedArea, codedCity)
    const result = await fetch(
        `https://cors-anywhere.herokuapp.com/https://www.post.gov.tw/post/streetNameData?city=${codedCity}&cityarea=${codedArea}`, {
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