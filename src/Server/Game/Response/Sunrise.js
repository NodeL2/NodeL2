const ServerPacket = invoke('Packet/Server');

function sunrise() {
    return (new ServerPacket(0x12)).fetchBuffer();
}

module.exports = sunrise;
