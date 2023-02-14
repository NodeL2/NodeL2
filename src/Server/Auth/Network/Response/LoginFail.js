const SendPacket = invoke('Server/Packet/Send');

function loginFail(errorCode) {
    const packet = new SendPacket(0x01);

    packet
        .writeC(errorCode); // Failure reason

    return packet.fetchBuffer();
}

// 0x01 System error
// 0x02 Password does not match this account
// 0x04 Access failed
// 0x07 The account is already in use

module.exports = loginFail;
