const SendPacket = invoke('Packet/Send');

function charCreateFail(errorCode) {
    const packet = new SendPacket(0x1a);

    packet
        .writeD(errorCode);

    return packet.fetchBuffer();
}

module.exports = charCreateFail;

// CREATION_FAILED     = 0x00
// TOO_MANY_CHARACTERS = 0x01
// NAME_ALREADY_EXISTS = 0x02
// 16_ENG_CHARS        = 0x03
// INCORRECT_NAME      = 0x04
