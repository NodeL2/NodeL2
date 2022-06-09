const ServerResponse = invoke('Server/Game/Response');
const ActorState     = invoke('Server/Game/Actor/State');

class Actor {
    constructor(data) {
        this.model = data;
        this.state = new ActorState();
    }

    moveTo(session, data) {
        session.dataSend(
            ServerResponse.moveToLocation(this.model.id, data)
        );
    }

    updatePosition(data) {
        this.model.locX = data.locX;
        this.model.locY = data.locY;
        this.model.locZ = data.locZ;
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

            case 12: // Emote: Greeting
            case 13: // Emote: Victory
            case 14: // Emote: Advance
            case 24: // Emote: Yes
            case 25: // Emote: No
            case 26: // Emote: Bow
            case 29: // Emote: Unaware
            case 30: // Emote: Social Waiting
            case 31: // Emote: Laugh
            case 33: // Emote: Applaud
            case 34: // Emote: Dance
            case 35: // Emote: Sorrow
                session.dataSend(
                    ServerResponse.socialAction(this.model.id, data.actionId)
                );
                break;

            default:
                infoWarn('GameServer:: unknown basic action %d', data.actionId);
                break;
        }
    }

    socialAction(session, actionId) {
        session.dataSend(
            ServerResponse.socialAction(this.model.id, actionId)
        );
    }
}

module.exports = Actor;
