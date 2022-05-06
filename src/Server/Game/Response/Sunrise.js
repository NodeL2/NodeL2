let ServerPacket = invoke('Packet/Server');

function sunrise() {
    let packet = new ServerPacket(0x1c);

    return packet.fetchBuffer();
}

module.exports = sunrise;
