let ClientPacket = invoke('ClientPacket');

function validatePosition(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD()  // X
        .readD()  // Y
        .readD()  // Z
        .readD()  // Heading
        .readD(); // ?

    let data = {
        x       : packet.data[1],
        y       : packet.data[2],
        z       : packet.data[3],
        heading : packet.data[4],
    };

    session.player.x = data.x;
    session.player.y = data.y;
    session.player.z = data.z;
    session.player.heading = data.heading;
}

module.exports = validatePosition;
