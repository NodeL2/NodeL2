const ServerPacket = invoke('Server/Packet/Server');

function logoutSuccess() {
    return (new ServerPacket(0x7e)).fetchBuffer();
}

module.exports = logoutSuccess;
