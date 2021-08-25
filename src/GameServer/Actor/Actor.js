let ServerResponse = invoke('GameServer/Response');

class Actor {
    constructor() {
    }

    setModel(data) {
        data.title = data.title ?? '';
        this.model = data;
    }

    move(session, data) {
        session.sendData(
            ServerResponse.moveToLocation(this.model.id, data)
        );
    }

    socialAction(session, data) {
        session.sendData(
            ServerResponse.socialAction(this.model.id, data.actionId)
        );
    }
}

module.exports = Actor;
