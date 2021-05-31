let ServerPacket = invoke('ServerPacket');

function playFail(errorCode) {
    let packet = new ServerPacket(12);

    packet
        .writeC(0x06)
        .writeC(errorCode); // Failure reason

    return packet.buffer;
}

module.exports = playFail;
