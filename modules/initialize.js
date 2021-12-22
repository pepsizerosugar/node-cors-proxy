const paramObject = require('../model/param')
const headerObject = require('../model/header')
const bodyObject = require('../model/body')
const fs = require('fs');

function init(req, endpoint) {
    var config = {
        method: req.method
    }

    var url = new URL(endpoint);

    if (Object.keys(req.query).length > 0) {
        const paramsObj = new paramObject();
        paramsObj.addParam(req);
        url.search = paramsObj.getParam().toString();
    }

    if (Object.keys(req.headers).length > 0) {
        const headersObj = new headerObject();
        headersObj.addHeader(req);
        config['headers'] = headersObj.getHeader();
    }

    if (req.body) {
        const bodyObj = new bodyObject();
        bodyObj.addBody(req);
        var body = bodyObj.getBody();

        if (body.length > 0 || Object.keys(body).length > 0) {
            if (req.headers["content-type"] == "application/x-www-form-urlencoded") {
                config['body'] = new URLSearchParams(body);
            } else {
                config['body'] = JSON.stringify(body);
            }
        }
    }
    if (!fs.existsSync('./image'))
        fs.mkdirSync('./image', { recursive: true });
    if (!fs.existsSync('./audio'))
        fs.mkdirSync('./audio', { recursive: true });
    if (!fs.existsSync('./video'))
        fs.mkdirSync('./video', { recursive: true });

    return { url, config }
}

module.exports = {
    init
}