const SendPacket = invoke('Packet/Send');

function serverList(optn, hostname) {
    const packet = new SendPacket(0x04);

    packet
        .writeC(0x01)  // Amount of servers
        .writeC(0x00); // Last server

    packet
        .writeC(optn.id)
        .writeC(hostname[0])
        .writeC(hostname[1])
        .writeC(hostname[2])
        .writeC(hostname[3])
        .writeD(optn.port)
        .writeC(0x00)  // Age limit
        .writeC(optn.pvp)
        .writeH(0x00)  // Connected players
        .writeH(optn.maxOnline)
        .writeC(0x01)  // Status ? Up = 1, Down = 0
        .writeD(0x00)  // ?
        .writeC(0x00); // Server Brackets

    return packet.fetchBuffer();
}

module.exports = serverList;
