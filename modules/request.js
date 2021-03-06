const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fs = require('fs');

async function sendRequest(res, config) {
    const endpoint = config.url;
    console.log(`[INFO] Request Endpoint: ${endpoint}`);
    console.log(`[INFO] Request Info:`);
    console.log(config.config);

    fetch.timeout = 0;

    await fetch(endpoint, config.config)
        .then(async response => {
            const type = response.headers.get("content-type");
            if (type) {
                while (true) {
                    let check = 0;
                    if (type === "application/json") {
                        await response.json().then(json => {
                            if (isJson(json)) {
                                let resBody = JSON.parse(json);
                                console.log("[INFO] Request-response: Response JSON object");
                                console.log(resBody);
                                res.json(resBody).end();
                            } else if (isStringJson(json)) {
                                let resBody = JSON.parse(JSON.stringify(json));
                                console.log("[INFO] Request-response: Response JSON string");
                                console.log(resBody);
                                res.json(resBody).end();
                            } else {
                                console.log("[INFO] Request-response: Response not JSON");
                                console.log(json);
                                res.send(json).end();
                            }
                            check = 1;
                        });
                        break;
                    }
                    if (type.match('image/*')) {
                        let imageType = type.replace("image/", "");
                        response.body.pipe(fs.createWriteStream(`./image/image.${imageType}`));
                        res.json({ "proxyMessage": "Image saved" }).end();
                        check = 1;
                        break;
                    }
                    if (type.match('audio/*')) {
                        let audioType = type.replace("audio/", "");
                        response.body.pipe(fs.createWriteStream(`./audio/audio.${audioType}`));
                        res.json({ "proxyMessage": "Audio saved" }).end();
                        check = 1;
                        break;
                    }
                    if (type.match('video/*')) {
                        let videoType = type.replace("video/", "");
                        response.body.pipe(fs.createWriteStream(`./video/video.${videoType}`));
                        res.json({ "proxyMessage": "Video saved" }).end();
                        check = 1;
                        break;
                    }
                    if (check === 0) {
                        await response.text().then(text => {
                            console.log("[INFO] Request-response: Response have data");
                            res.send(text).end();
                        });
                        break;
                    }
                }
            } else {
                console.log("[INFO] Request-response: Response no data");
                res.send(response).end();
            }

            console.log(`[INFO] Request End: ${endpoint}`);
            console.log(`--------------------------------------------------------------------------------\n`);
        })
        .catch(error => {
            console.error(`[ERROR] ${error}`)
            res.send({ "proxyMessage": error.toString() }).end();
        });
}

function isJson(data) {
    try {
        let json = JSON.parse(data);
        return (typeof json === 'object');
    } catch (err) {
        return false;
    }
}

function isStringJson(data) {
    try {
        let json = JSON.parse(JSON.stringify(data));
        return (typeof json === 'object');
    } catch (err) {
        return false;
    }
}

module.exports = {
    sendRequest
}
