const SendPacket = invoke('Packet/Send');

function sunrise() {
    return (new SendPacket(0x28)).fetchBuffer();
}

module.exports = sunrise;
