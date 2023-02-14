const ServerPacket = invoke('Server/Packet/Server');

function sunrise() {
    return (new ServerPacket(0x1c)).fetchBuffer();
}

module.exports = sunrise;
