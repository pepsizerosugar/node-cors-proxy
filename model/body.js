class bodyObject {
    constructor() {
        this.body = {}
    }

    addElement(body) {
        this.body = body
    }

    addBody(req) {
        if (req.body) {
            this.addElement(req.body);
        } else {
            var body = [];
            req.on('error', (err) => {
                console.error(err);
            }).on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                this.addElement(body);
            });
        }
    }

    getBody() {
        return this.body
    }
}

module.exports = bodyObject