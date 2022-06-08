const ServerPacket = invoke('Packet/Server');

function logoutSuccess() {
    return (new ServerPacket(0x84)).fetchBuffer();
}

module.exports = logoutSuccess;
