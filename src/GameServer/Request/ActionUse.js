let ClientPacket = invoke('ClientPacket');

function actionUse(buffer) {
    return new Promise((success) => {
        let packet = new ClientPacket(buffer);

        packet
            .readC()
            .readD()  // Action ID
            .readD()
            .readC();

        return success({
            actionId: packet.data[1]
        });
    });
}

module.exports = actionUse;
