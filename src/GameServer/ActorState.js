class ActorState {
    constructor() {
        this.state = [
            {
                id  : StateType.IS_CHANGING_WAIT_TYPE,
                now : false,
            },
            {
                id  : StateType.IS_SITTING,
                now : false,
            },
            {
                id  : StateType.IS_CASTING,
                now : false,
            },
            {
                id  : StateType.IS_FIGHTING,
                now : false,
            },
            {
                id  : StateType.IS_PICKING_UP,
                now : false,
            },
            {
                id  : StateType.IS_MOVING_TO_TARGET,
                now : false,
            },
            {
                id  : StateType.IS_USING_SOCIAL_ACTION,
                now : false,
            }
        ];

        this.state = [];
        this.state[StateType.IS_CHANGING_WAIT_TYPE] = false;
        this.state[StateType.IS_SITTING] = false;
        this.state[StateType.IS_CASTING] = false;
        this.state[StateType.IS_FIGHTING] = false;
        this.state[StateType.IS_PICKING_UP] = false;
        this.state[StateType.IS_MOVING_TO_TARGET] = false;
        this.state[StateType.IS_USING_SOCIAL_ACTION] = false;
    }

    requestChangeWaitType() {
        return !CASTING;
    }

    requestCastMagic() {
        return !CHANGING_WAIT_TYPE && !SITTING && !CASTING;
    }

    requestFight() {
        return !CHANGING_WAIT_TYPE && !SITTING && !CASTING && !FIGHTING && !PICKING_UP;
    }

    requestPickUp() {
        return !CHANGING_WAIT_TYPE && !SITTING && !CASTING && !FIGHTING && !PICKING_UP;
    }

    requestMove() {
        return !CHANGING_WAIT_TYPE && !SITTING && !CASTING && !FIGHTING && !PICKING_UP;
    }

    requestUseSocialAction() {
        return !CHANGING_WAIT_TYPE && !SITTING && !CASTING && !FIGHTING && !PICKING_UP;
    }
}
