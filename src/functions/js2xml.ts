import convert from "xml-js";

const response = {
    _declaration: { _attributes: { version: '1.0', encoding: 'utf-8' } },
    API3G: {
        Response: "OK"
    }
}

const xml = convert.js2xml(response, { compact: true, spaces: 4 });
console.log(xml);