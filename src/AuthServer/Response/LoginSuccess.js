let Config       = invoke('Config');
let ServerPacket = invoke('ServerPacket');

function loginSuccess() {
    let packet = new ServerPacket(48);

    packet
        .writeC(0x03)
        .writeD(Config.client.sessionKey1) // Session Key (first)
        .writeD(Config.client.sessionKey2) // Session Key (last)
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x000003ea)
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x02);

    return packet.buffer;
}

module.exports = loginSuccess;
