const SendPacket = invoke('Packet/Send');

function sunrise() {
    return (new SendPacket(0x1c)).fetchBuffer();
}

module.exports = sunrise;
