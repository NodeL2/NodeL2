let ClientPacket = invoke('ClientPacket');

function socialAction(buffer) {
    return new Promise((success) => {
        let packet = new ClientPacket(buffer);

        packet
            .readC()
            .readD();

        return success({
            actionId: packet.data[1]
        });
    });
}

module.exports = socialAction;
