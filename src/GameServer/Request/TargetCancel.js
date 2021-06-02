let ClientPacket = invoke('ClientPacket');

function targetCancel(buffer) {
    return new Promise((success) => {
        let packet = new ClientPacket(buffer);

        packet
            .readC();

        return success({
        });
    });
}

module.exports = targetCancel;
