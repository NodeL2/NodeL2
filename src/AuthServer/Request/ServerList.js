let ClientPacket   = invoke('ClientPacket');
let Config         = invoke('Config');
let ServerResponse = invoke('AuthServer/Response');
let Utils          = invoke('Utils');

// Module imports
let OSAttributes = require('os');

function serverList(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readD()  // Session Key (first)
        .readD(); // Session Key (last)

    consume(session, {
        sessionKey1: packet.data[0],
        sessionKey2: packet.data[1],
    });
}

function consume(session, data) {
    if (Utils.matchSessionKeys(Config.client, data)) {
        session.sendData(
            ServerResponse.serverList(Config.gameServer, fetchIPAddressType(session))
        );
    }
    else { // Session keys don't match
        session.sendData(
            ServerResponse.loginFail(0x01)
        );
    }
}

function fetchIPAddressType(session) {
    let host = session.socket.remoteAddress.split('.');

    if (host[0] === '127') { // Localhost
        return session.socket.remoteAddress
    } else
    if (host[0] === '192' && host[1] === '168') { // LAN
        let network = OSAttributes.networkInterfaces();
        return network['en0'][1].address;
    } else { // Likely WAN
        fatalError('AuthServer:: unhandled WAN address');
    }
}

module.exports = serverList;
