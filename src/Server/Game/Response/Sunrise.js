const ServerPacket = invoke('Packet/Server');

function sunrise() {
    const packet = new ServerPacket(0x12);

    return packet.fetchBuffer();
}

module.exports = sunrise;
