const ClientPacket = invoke('Packet/Server');

function serverList(session, buffer) {
    const packet = new ServerPacket(0x04);
    const hostname = ipAddress.split('.');

    packet
        .writeC(0x01) // Amount of Servers
        .writeC(config.id)
        .writeC(config.id)
        .writeC(hostname[0])
        .writeC(hostname[1])
        .writeC(hostname[2])
        .writeC(hostname[3])
        .writeD(config.port)
        .writeC(0x00) // Age limit
        .writeC(config.pvp)
        .writeH(0x00) // Connected players
        .writeH(config.maxPlayers)
        .writeC(0x01) // Status ? Up = 1, Down = 0
        .writeD(config.type)
        .writeC(0x00) // Server Brackets
        .writeH(0x00) // ?
        .writeC(characters)
        .writeC(config.id)
        .writeC(characters);

    return packet.fetchBuffer();
}

function consume(session, data) {
}

module.exports = serverList;
