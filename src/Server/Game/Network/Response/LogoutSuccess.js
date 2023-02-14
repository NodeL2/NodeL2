const SendPacket = invoke('Server/Packet/Send');

function logoutSuccess() {
    return (new SendPacket(0x7e)).fetchBuffer();
}

module.exports = logoutSuccess;
