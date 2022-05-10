let ServerPacket = invoke('Packet/Server');

function sunrise() {
    let packet = new ServerPacket(0x12);

    return packet.fetchBuffer();
}

module.exports = sunrise;
