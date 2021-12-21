const express = require('express');
const app = express();
const https = require('https');
const cors = require('cors');
const fs = require('fs');
const { init } = require('./modules/initialize');
const { sendRequest } = require('./modules/request');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all(':endpoint([\\/\\w\\.-]*)', async (req, res) => {
    const target = req.params.endpoint;
    if (target != "/favicon.ico") {
        const endpoint = target.substring(1, target.length);
        console.log(`\n--------------------------------------------------------------------------------`);
        console.log(`[INFO] Request: Start`);
        const config = init(req, endpoint);
        await sendRequest(res, config);
    }
});

const IP = process.env.IP || 'localhost';
const PORT = process.env.PORT || 6789;
const httpsOptions = {
    key: fs.readFileSync(__dirname + '/cert/key.pem', 'utf8'),
    cert: fs.readFileSync(__dirname + '/cert/cert.pem', 'utf8'),
}

https.createServer(httpsOptions, app)
    .listen(PORT, IP, () => console.log(`[INFO] Listening on IP: ${IP} Port: ${PORT}`));