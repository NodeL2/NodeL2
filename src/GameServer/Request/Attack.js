let ClientPacket = invoke('ClientPacket');

function attack(buffer) {
    return new Promise((success) => {
        let packet = new ClientPacket(buffer);

        packet
            .readC()
            .readD()
            .readD()
            .readD()
            .readD()
            .readC();

        return success({
            id: packet.data[1],
             x: packet.data[2],
             y: packet.data[3],
             z: packet.data[4],
        });
    });
}

module.exports = attack;
