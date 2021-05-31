let Config = invoke('Config');
let ServerPacket = invoke('ServerPacket');

function loginOk() {
    let packet = new ServerPacket(48);

    packet
        .writeC(0x03)
        .writeD(Config.sessionKey[0]) // Session Key (first)
        .writeD(Config.sessionKey[1]) // Session Key (last)
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x000003ea)
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x02);

    return packet.buffer;
}

module.exports = loginOk;
