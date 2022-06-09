const ServerResponse = invoke('Server/Game/Response');
const ClientPacket   = invoke('Packet/Client');

function moveToLocation(session, buffer) {
    const packet = new ClientPacket(buffer);

    packet
        .readD()  // Destination X
        .readD()  // Destination Y
        .readD()  // Destination Z
        .readD()  // Source X
        .readD()  // Source Y
        .readD(); // Source Z

    consume(session, {
        from: {
            locX: packet.data[3],
            locY: packet.data[4],
            locZ: packet.data[5],
        },
        to: {
            locX: packet.data[0],
            locY: packet.data[1],
            locZ: packet.data[2],
        }
    });
}

function consume(session, data) {
    session.actor.moveTo(session, data);
}

module.exports = moveToLocation;