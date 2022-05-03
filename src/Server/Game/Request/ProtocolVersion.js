let ServerResponse = invoke('Server/Game/Response');
let ClientPacket   = invoke('Packet/Client');
let Config         = invoke('Config');

function protocolVersion(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readD(); // Protocol Version

    consume(session, {
        protocolVersion: packet.data[0]
    });
}

function consume(session, data) {
    if (Config.client.protocol !== data.protocolVersion) {
        fatalError('GameServer:: client protocol version mismatch: %d', data.protocolVersion);
    }

    session.dataSend(
        ServerResponse.versionCheck(Config.client.protocol === data.protocolVersion)
    );
}

module.exports = protocolVersion;
