const ServerResponse = invoke('Server/Game/Response');
const ClientPacket   = invoke('Packet/Client');

function validatePosition(session, buffer) {
    const packet = new ClientPacket(buffer);

    packet
        .readD()  // X
        .readD()  // Y
        .readD()  // Z
        .readD()  // Heading
        .readD(); // ?

    consume(session, {
        locX: packet.data[0],
        locY: packet.data[1],
        locZ: packet.data[2],
    });
}

function consume(session, data) {
}

module.exports = validatePosition;
