const SendPacket = invoke('Packet/Send');

function cipherInit() { // TODO: Invoke cipher XOR key
    const packet = new SendPacket(0x00);

    packet
        .writeC(0x01)
        .writeC(0x00)
        .writeC(0x00)
        .writeC(0x00)
        .writeC(0x00)
        .writeC(0x00)
        .writeC(0x00)
        .writeC(0x00)
        .writeC(0x00);

    return packet.fetchBuffer();
}

module.exports = cipherInit;
