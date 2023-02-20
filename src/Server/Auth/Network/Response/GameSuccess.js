const SendPacket = invoke('Server/Packet/Send');

function gameSuccess(session) {
    const packet = new SendPacket(0x07);

    packet
        .writeD(session.key1)
        .writeD(session.key2);

    return packet.fetchBuffer();
}

module.exports = gameSuccess;
