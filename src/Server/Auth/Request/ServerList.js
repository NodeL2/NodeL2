const ServerResponse = invoke('Server/Auth/Response');
const ClientPacket   = invoke('Packet/Client');
const Database       = invoke('Database');

function serverList(session, buffer) {
    const packet = new ClientPacket(buffer);

    packet
        .readD()  // Session Key (first)
        .readD(); // Session Key (last)

    consume(session, {
        key1: packet.data[0],
        key2: packet.data[1],
    });
}

function consume(session, data) {
    if (utils.sessionMatch(session, data)) {
        session.dataSend(
            ServerResponse.serverList(options.connection.GameServer, detectServerIPAddress(session).split('.'))
        );
    }
    else { // Session keys don't match
        session.dataSend(
            ServerResponse.loginFail(0x01)
        );
    }
}

function detectServerIPAddress(session) {
    const remoteAddr = session.socket.remoteAddress;
    const host = remoteAddr.split('.');

    switch (host[0]) {
        case '127': // Localhost
            return remoteAddr;

        case '192': // LAN
            return Utils.fetchIPv4Address();
    }

    // WAN / Internet
    utils.infoFail('AuthServer:: unhandled WAN address');
    return '';
}

module.exports = serverList;
