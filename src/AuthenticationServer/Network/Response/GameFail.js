const SendPacket = invoke('Packet/Send');

function gameFail(errorCode) {
    const packet = new SendPacket(0x06);

    packet
        .writeD(errorCode);

    return packet.fetchBuffer();
}

module.exports = gameFail;

// SYSTEM_ERROR       = 0x01
// USER_OR_PASS_WRONG = 0x02
// TOO_MANY_PLAYERS   = 0x0f
