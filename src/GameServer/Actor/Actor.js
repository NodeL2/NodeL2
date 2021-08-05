class Actor {
    constructor() {
    }

    setModel(data) {
        if (!data.title) { data.title = ''; }
        this.model = data;
    }
}

module.exports = Actor;
