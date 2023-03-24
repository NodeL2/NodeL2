const SendPacket = invoke('Packet/Send');

function sunset() {
    return (new SendPacket(0x29)).fetchBuffer();
}

module.exports = sunset;
