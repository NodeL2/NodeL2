let ClientPacket = invoke('ClientPacket');

function moveToLocation(buffer) {
    return new Promise((success) => {
        let packet = new ClientPacket(buffer);

        packet
            .readC()
            .readD()  // Destination X
            .readD()  // Destination Y
            .readD()  // Destination Z
            .readD()  // Source X
            .readD()  // Source Y
            .readD(); // Source Z

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
