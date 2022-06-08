const ServerPacket = invoke('Packet/Server');

function gameFail(errorCode) {
    const packet = new ServerPacket(0x06);

    packet
        .writeC(errorCode); // Failure reason

    return packet.fetchBuffer();
}

module.exports = gameFail;
