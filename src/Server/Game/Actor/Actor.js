const ServerResponse = invoke('Server/Game/Response');
const ActorState     = invoke('Server/Game/Actor/State');

class Actor {
    constructor(data) {
        this.model = data;
        this.state = new ActorState();
    }

    basicAction(session, data) {
        switch (data.actionId) {
            case 0: // Sit / Stand
                session.dataSend(
                    ServerResponse.sitAndStand(
                        this.model.id,
                        this.state.isSitting = !this.state.isSitting,
                        this.model.locX,
                        this.model.locY,
                        this.model.locZ
                    )
                );
                break;

            case 1: // Walk / Run
                session.dataSend(
                    ServerResponse.walkAndRun(
                        this.model.id,
                        this.state.isWalking = !this.state.isWalking
                    )
                );
                break;

            default:
                infoWarn('GameServer:: unknown basic action %d', data.actionId);
                break;
        }
    }

    updatePosition(data) {
        this.model.locX = data.locX;
        this.model.locY = data.locY;
        this.model.locZ = data.locZ;
    }
}

module.exports = Actor;
