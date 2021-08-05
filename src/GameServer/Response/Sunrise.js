let ServerPacket = invoke('ServerPacket');

function sunrise() {
    let packet = new ServerPacket(8);

    packet
        .writeC(0x28);

    return packet.buffer;
}

module.exports = sunrise;
