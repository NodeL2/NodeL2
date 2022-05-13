let ServerPacket = invoke('Packet/Server');

function serverList(config, ipAddress, characters) {
    let packet = new ServerPacket(0x04);
    let hostname = ipAddress.split('.');

    packet
        .writeC(0x01)        // Amount of Servers
        .writeC(config.id)
        .writeC(config.id)
        .writeC(hostname[0]) // Server IP
        .writeC(hostname[1]) // Server IP
        .writeC(hostname[2]) // Server IP
        .writeC(hostname[3]) // Server IP
        .writeD(config.port)
        .writeC(0x00)        // Age limit
        .writeC(config.pvp)
        .writeH(0x00)        // Connected players
        .writeH(config.maxPlayers)
        .writeC(0x01)        // Status ? Up = 1, Down = 0
        .writeD(config.type)
        .writeC(0x00)        // Server Brackets?
        .writeH(0x00)        // ?
        .writeC(characters)
        .writeC(config.id)
        .writeC(characters);

    return packet.fetchBuffer();
}

module.exports = serverList;
