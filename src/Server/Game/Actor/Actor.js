const ServerResponse = invoke('Server/Game/Response');

class Actor {
    constructor(data) {
        data.title = data.title ?? '';
        this.model = data;
    }

    basicAction(session, data) {
        switch (data.actionId) {
            case 1:
                session.dataSend(
                    ServerResponse.alterMovement(this)
                );
                break;

            default:
                infoWarn('GameServer:: unknown basic action %d', data.actionId);
                break;
        }
    }
}

module.exports = Actor;
