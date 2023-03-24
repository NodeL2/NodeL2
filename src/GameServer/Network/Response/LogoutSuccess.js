const SendPacket = invoke('Packet/Send');

function logoutSuccess() {
    return (new SendPacket(0x96)).fetchBuffer();
}

module.exports = logoutSuccess;
