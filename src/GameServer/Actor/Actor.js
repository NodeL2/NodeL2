let ServerResponse = invoke('GameServer/Response');

class Actor {
    constructor() {
    }

    setModel(data) {
        if (!data.title) { data.title = ''; }
        this.model = data;
    }

    move(session, data) {
        session.sendData(
            ServerResponse.moveToLocation(this.model.id, data)
        );
    }
}

module.exports = Actor;
