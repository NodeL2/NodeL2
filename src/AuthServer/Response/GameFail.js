let ServerPacket = invoke('ServerPacket');

function gameFail(errorCode) {
    let packet = new ServerPacket(8); // 2

    packet
        .writeC(0x06)
        .writeC(errorCode); // Failure reason

    return packet.buffer;
}

module.exports = gameFail;
