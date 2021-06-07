let GameServerResponse = invoke('GameServer/GameServerResponse');

class ActorState {
    constructor() {
        this.raw = {
            isCastingMagic     : false,
            isChangingWaitType : false,
            isFighting         : false,
            isMoving           : false,
            isPickingUp        : false,
            isSitting          : false,
            isWalking          : false,
        };
    }

    isBusy(session) {
        if (this.raw.isCastingMagic ||
            this.raw.isChangingWaitType ||
            this.raw.isFighting  ||
            this.raw.isPickingUp ||
            this.raw.isSitting) {

            session.sendData(
                GameServerResponse.actionFailed()
            );
            return true;
        }
        return false;
    }

    isCastingMagic(value) {
        this.raw.isCastingMagic = value;
    }

    isChangingWaitType(value) {
        this.raw.isChangingWaitType = value;
    }

    isFighting(value) {
        this.raw.isFighting = value;
    }

    isMoving(value) {
        this.raw.isMoving = value;
    }

    isPickingUp(value) {
        this.raw.isPickingUp = value;
    }

    isSitting(value) {
        this.raw.isSitting = value;
    }

    isWalking(value) {
        this.raw.isWalking = value;
    }
}

module.exports = ActorState;
