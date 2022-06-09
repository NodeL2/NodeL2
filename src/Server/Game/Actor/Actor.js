const ServerResponse = invoke('Server/Game/Response');
const ActorState     = invoke('Server/Game/Actor/State');

class Actor {
    constructor(data) {
        this.model = data;
        this.state = new ActorState();
    }

    basicAction(session, data) {
        switch (data.actionId) {
            case 1:
                session.dataSend(
                    ServerResponse.alterMovement(this.model.id, this.state.isWalking = !this.state.isWalking)
                );
                break;

            default:
                infoWarn('GameServer:: unknown basic action %d', data.actionId);
                break;
        }
    }
}

module.exports = Actor;
