const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const paramObject = require('../model/param')
const headerObject = require('../model/header')
const bodyObject = require('../model/body')

function sendRequest(req, res, endpoint) {
    var method = req.method;

    const paramsObj = new paramObject();
    paramsObj.addParam(req)
    var params = paramsObj.getParam();

    const headersObj = new headerObject();
    headersObj.addHeader(req);
    var headers = headersObj.getHeader();

    const bodyObj = new bodyObject();
    bodyObj.addBody(req);
    var body = bodyObj.getBody();

    console.log(`[INFO] ENDPOINT: ${endpoint}`)

    var config = {
        method
    }

    if (Object.keys(params).length > 0)
        config['qs'] = params;
    if (Object.keys(headers).length > 0)
        config['headers'] = headers;
    if (body.length > 0 || Object.keys(body).length > 0) {
        if (headers["content-type"] == "application/x-www-form-urlencoded") {
            config['form'] = body;
        } else {
            config['body'] = body;
            config.json = true
        }
    }

    console.log(config);

    await fetch(endpoint, config)
        .then(async response => {
            const jsonBody = await response.json();

            if (isJson(jsonBody)) {
                console.log("[INFO] Request: Response JSON object")
                res.json(JSON.parse(jsonBody)).end();
            } else if (isStringJson(jsonBody)) {
                console.log("[INFO] Request: Response JSON string")
                res.json(JSON.parse(JSON.stringify(jsonBody))).end();
            } else {
                console.log("[INFO] Request: Response no JSON")
                res.end(txtBody);
            }

            console.log(`[INFO] Request END: ${endpoint}`)
            console.log(`--------------------------------------------------------------------------------\n`)
        })
        .catch(error => {
            console.error(`[ERROR] ${error}`)
            res.json(error).end();
        });
}

function isJson(data) {
    try {
        var json = JSON.parse(data);
        return (typeof json === 'object');
    } catch (err) {
        return false;
    }
}

function isStringJson(data) {
    try {
        var json = JSON.parse(JSON.stringify(data));
        if (typeof json === 'object')
            return true;
    } catch (err) {
        return false;
    }
}

module.exports = {
    sendRequest
}