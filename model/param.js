class paramObject {
    constructor() {
        this.params = {}
    }

    addElement(key, value) {
        this.params[key] = value
    }

    addParam(req) {
        for (const [key, value] of Object.entries(req.query)) {
            this.addElement(key, value);
        }
    }

    getParam() {
        return this.params
    }
}

module.exports = paramObject