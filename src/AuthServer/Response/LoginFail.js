let ServerPacket = invoke('ServerPacket');

function loginFail(errorCode) {
    let packet = new ServerPacket(8); // 2

    packet
        .writeC(0x01)
        .writeC(errorCode); // Failure reason

    return packet.buffer;
}

// 0x01 System error
// 0x02 Password does not match this account
// 0x04 Access failed
// 0x07 The account is already in use

module.exports = loginFail;
