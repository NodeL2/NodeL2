const SendPacket = invoke('Packet/Send');

function sunset() {
    return (new SendPacket(0x1d)).fetchBuffer();
}

module.exports = sunset;
