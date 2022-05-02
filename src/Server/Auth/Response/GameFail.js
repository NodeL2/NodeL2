let ServerPacket = invoke('Packet/Server');

function gameFail(errorCode) {
    let packet = new ServerPacket(0x06);

    packet
        .writeC(errorCode); // Failure reason

    return packet.fetchBuffer();
}

module.exports = gameFail;
