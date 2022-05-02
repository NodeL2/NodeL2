let ServerPacket = invoke('Packet/Server');

function serverList(config, ipAddress) {
    let packet = new ServerPacket(0x04);

    let hostname   = ipAddress.split('.');
    let port       = config.port;
    let maxPlayers = config.maxPlayers

    packet
        .writeC(0x01)        // Amount of Servers
        .writeC(0x00)        // Last Server ID
        .writeC(0x01)        // Server ID
        .writeC(hostname[0]) // Server IP
        .writeC(hostname[1]) // Server IP
        .writeC(hostname[2]) // Server IP
        .writeC(hostname[3]) // Server IP
        .writeD(port)        // Server port
        .writeC(0x00)        // Age limit
        .writeC(0x00)        // PVP ? Yes = 1, No = 0
        .writeH(0x00)        // Connected players
        .writeH(maxPlayers)  // Max players
        .writeC(0x01)        // Status ? Up = 1, Down = 0
        .writeD(0x00)        // Test Server & Clock ???
        .writeC(0x00);       // Server Brackets ???

    return packet.fetchBuffer();
}

module.exports = serverList;
