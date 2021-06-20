let ServerPacket = invoke('ServerPacket');

function loginFail(errorCode) {
    let packet = new ServerPacket(8); // 2

    packet
        .writeC(0x01)
        .writeC(errorCode); // Failure reason

    return packet.buffer;
}

module.exports = loginFail;
