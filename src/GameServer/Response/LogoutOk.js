let ServerPacket = invoke('ServerPacket');

function logoutOk() {
    let packet = new ServerPacket(1);

    packet
        .writeC(0x96);

    return packet.buffer;
}

module.exports = logoutOk;
