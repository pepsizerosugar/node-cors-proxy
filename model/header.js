class headerObject {
    constructor() {
        this.header = {}
    }

    addElement(key, value) {
        this.header[key] = value
    }

    addHeader(req) {
        for (const [key, value] of Object.entries(req.headers)) {
            this.addElement(key, value);
        }
    }

    getHeader() {
        return this.header
    }
}

module.exports = headerObject