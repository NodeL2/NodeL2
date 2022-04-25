let ServerPacket = invoke('ServerPacket');

function authGG() {
    let packet = new ServerPacket(0x0b);

    packet
        .writeC(0x00);

    return packet.fetchBuffer();
}

module.exports = authGG;
