class Actor {
    constructor(data) {
        data.title = data.title ?? '';
        this.model = data;
    }
}

module.exports = Actor;
