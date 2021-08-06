let ClientPacket   = invoke('ClientPacket');
let Config         = invoke('Config');
let ServerResponse = invoke('GameServer/Response');

function protocolVersion(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readD(); // Protocol Version

    consume(session, {
        protocolVersion: packet.data[0]
    });
}

function consume(session, data) {
    session.sendData(
        ServerResponse.versionCheck(Config.client.protocol === data.protocolVersion)
    );
}

module.exports = protocolVersion;
