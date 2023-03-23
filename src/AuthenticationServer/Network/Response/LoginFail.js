const SendPacket = invoke('Packet/Send');

function loginFail(errorCode) {
    const packet = new SendPacket(0x01);

    packet
        .writeD(errorCode);

    return packet.fetchBuffer();
}

module.exports = loginFail;

// SYSTEM_ERROR       = 0x01
// PASS_WRONG         = 0x02
// USER_OR_PASS_WRONG = 0x03
// ACCESS_FAILED      = 0x04
// ACCOUNT_IN_USE     = 0x07
