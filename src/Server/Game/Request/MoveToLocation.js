const ServerResponse = invoke('Server/Game/Response');
const ClientPacket   = invoke('Packet/Client');

function moveToLocation(session, buffer) {
    const packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD()  // Destination X
        .readD()  // Destination Y
        .readD()  // Destination Z
        .readD()  // Source X
        .readD()  // Source Y
        .readD(); // Source Z

    consume(session, {
        origin: {
            x: packet.data[3],
            y: packet.data[4],
            z: packet.data[5],
        },
        target: {
            x: packet.data[0],
            y: packet.data[1],
            z: packet.data[2],
        }
    });
}

function consume(session, data) {
    //session.dataSend(
    //    ServerResponse.moveToLocation(this.model.id, data)
    //);
}

module.exports = moveToLocation;