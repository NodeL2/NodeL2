const SendPacket = invoke('Server/Packet/Send');

function cipherInit() { // TODO: Invoke cipher XOR key
    let packet = new SendPacket(0x00);

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
