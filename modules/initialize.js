const requestObject = require('../model/request');
const fs = require('fs');

function init(req, endpoint) {
    return new Promise((resolve) => {
        mkdir()
            .then(async () => {
                await settingConfig(req, endpoint)
                    .then(([url, config]) => {
                        resolve({ url, config });
                    })
                    .catch(console.log);
            })
            .catch(console.log);;
    })
}

function settingConfig(req, endpoint) {
    const requestObj = new requestObject();
    return new Promise((resolve) => {
        try {
            var url = new URL(endpoint);
            if (Object.keys(req.query).length > 0) {
                requestObj.addParam('params', req);
                url.search = requestObj.getParam().toString();
            }

            if (Object.keys(req.headers).length > 0) {
                requestObj.addHeader('headers', req);
            }

            requestObj.addBody(req, (result) => {
                if (result) {
                    console.log(`[INFO] Request Setting End`);
                    resolve([url, requestObj.getConfig()]);
                }
            });
        } catch (err) {
            console.log(err);
        }
    });
}

function mkdir() {
    return new Promise((resolve) => {
        try {
            if (!fs.existsSync('./image'))
                fs.mkdirSync('./image', { recursive: true });
            if (!fs.existsSync('./audio'))
                fs.mkdirSync('./audio', { recursive: true });
            if (!fs.existsSync('./video'))
                fs.mkdirSync('./video', { recursive: true });
        } finally {
            resolve(true);
        }
    });
}

module.exports = {
    init
}