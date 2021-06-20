let ServerPacket = invoke('ServerPacket');

function serverList(config) {
    let packet = new ServerPacket(24);

    let host = config.host.split('.');
    let port = config.port;

    packet
        .writeC(0x04)
        .writeC(1)       // Number of servers
        .writeC(0)       // LS Number
        .writeC(1)       // Server ID
        .writeC(host[0]) // Server IP
        .writeC(host[1]) // Server IP
        .writeC(host[2]) // Server IP
        .writeC(host[3]) // Server IP
        .writeD(port)    // Server port
        .writeC(100)     // Age limit
        .writeC(0)       // PVP ? 1 = Yes, 0 = No
        .writeH(0)       // Current players
        .writeH(500)     // Max players
        .writeC(1);      // Status ? 1 = Up, 0 = Down

    return packet.buffer;
}

module.exports = serverList;
