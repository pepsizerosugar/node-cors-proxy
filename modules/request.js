const request = require('request');
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
        method,
        url: endpoint
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

    request(config, function (error, response) {
        if (error) {
            console.error(`[ERROR] ${error}`)
            res.json({"proxyMessage" : "error when request to target. check console error"}).end();
        } else {
            if (response != undefined && response.hasOwnProperty('body')) {
                if (isJson(response.body)) {
                    console.log("[INFO] Request: Response JSON object")
                    res.json(JSON.parse(response.body)).end();
                } else if (isStringJson(response.body)) {
                    console.log("[INFO] Request: Response JSON string")
                    res.json(JSON.parse(JSON.stringify(response.body))).end();
                } else {
                    console.log("[INFO] Request: Response body is not JSON")
                    res.end(response.body);
                }
            } else {
                console.warn("[INFO] Request: No response")
                res.json({"proxyMessage" : "no response from origin api."}).end();
            }
        }
        console.log(`[INFO] Request End: ${endpoint}`)
        console.log(`--------------------------------------------------------------------------------\n`)
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