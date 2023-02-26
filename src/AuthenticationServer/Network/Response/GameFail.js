const SendPacket = invoke('Packet/Send');

function gameFail(errorCode) {
    const packet = new SendPacket(0x06);

    packet
        .writeC(errorCode);

    return packet.fetchBuffer();
}

module.exports = gameFail;
