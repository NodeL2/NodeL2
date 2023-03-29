const ServerResponse = invoke('AuthenticationServer/Network/Response');
const ReceivePacket  = invoke('Packet/Receive');

function serverList(session, buffer) {
    const packet = new ReceivePacket(buffer);

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
            ServerResponse.serverList(options.default.GameServer, detectServerIPAddress(session).split('.'))
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
            return utils.fetchIPv4Address();
    }

    // WAN / Internet
    utils.infoFail('AuthServer', 'unhandled WAN Address');
    return '';
}

module.exports = serverList;
