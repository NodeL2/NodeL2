const SendPacket = invoke('Server/Packet/Send');

function gameFail(errorCode) {
    const packet = new SendPacket(0x06);

    packet
        .writeC(errorCode); // Failure reason

    return packet.fetchBuffer();
}

module.exports = gameFail;
