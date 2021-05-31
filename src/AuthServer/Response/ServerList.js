let ServerPacket = invoke('ServerPacket');

function serverList(host, port) {
    host = host.split('.');

    let packet = new ServerPacket(20);

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
        .writeH(0)       // Current player
        .writeH(500)     // Max player
        .writeC(1);      // Status ? 1 = Up, 0 = Down

    return packet.buffer;
}

module.exports = serverList;
