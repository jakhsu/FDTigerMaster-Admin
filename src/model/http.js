const fetch = require('node-fetch')
let data;
const convert = require("xml-js");

function fetchStreet() {
    console.log("button pressed!");
    let url = "https://cors-anywhere.herokuapp.com/https://www.post.gov.tw/post/streetNameData?" + "city=臺北市" + "&" + "cityarea=內湖區"
    fetch(url, {
            method: 'post',
        })
        .then(response => {
            let blob = response.blob()
            console.log(blob)
            return blob
        })
        .then(blob => {
            var reader = new FileReader();
            reader.onload = function () {
                console.log("reader is onload")
                var htmlData = reader.result;
                htmlData = (new window.DOMParser()).parseFromString(htmlData, "text/xml");
                let result = htmlData;
                console.log(result);
                let converted = convert.xml2js(result, {
                    spaces: 4
                });
                console.log(converted);
            }
            window.data = reader.readAsText(blob, 'Big5')
        })
        .then(
            console.log()
        )
}

function checkdata() {
    console.log("checking what data is...")
    console.log(data)
}


export {
    fetchStreet,
    checkdata
};