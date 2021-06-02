let ClientPacket = invoke('ClientPacket');

function moveToLocation(buffer) {
    return new Promise((success) => {
        let packet = new ClientPacket(buffer);

        packet
            .readC()
            .readD()
            .readD()
            .readD()
            .readD()
            .readD()
            .readD();

        return success({
            origin: {
                x: packet.data[4],
                y: packet.data[5],
                z: packet.data[6],
            },
            target: {
                x: packet.data[1],
                y: packet.data[2],
                z: packet.data[3],
            }
        });
    });
}

module.exports = moveToLocation;
