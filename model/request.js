class requestObject {
    constructor() {
        this.config = {};
    }

    addElement(type, data) {
        if (type == 'method' || type == 'body') {
            this.config[type] = data;
        }
        else {
            this.config[type][data.key] = data.value;
        }
    }

    addMethod(req) {
        this.addElement('method', req.method);
    }

    addParam(type, req) {
        this.config[type] = {};
        for (const [key, value] of Object.entries(req.query)) {
            this.addElement(type, { key, value });
        }
    }

    addHeader(type, req) {
        this.config[type] = {};
        for (const [key, value] of Object.entries(req[type])) {
            this.addElement(type, { key, value });
        }
    }

    addBody(req, cb) {
        if (this.isNotEmpty(req.body)) {
            this.addElement('body', req.body);
            cb(true);
        } else {
            var body = [];
            req.on('error', (err) => {
                console.error(err);
            }).on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                if (this.isNotEmpty(body)) {
                    body = JSON.stringify(body);
                    this.addElement('body', body);
                    cb(true);
                }
                if (body.length > 0) {
                    this.addElement('body', body);
                    cb(true);
                } else {
                    cb(true);
                }
            });
        }
    }

    getParam() {
        return new URLSearchParams(this.config.params);
    }

    getConfig() {
        return this.config;
    }

    isNotEmpty(data) {
        return Object.keys(data).length > 0;
    }
}

module.exports = requestObject;