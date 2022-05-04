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
    if (data.protocolVersion < 0 || data.protocolVersion >= 0xffff) { // TODO: Find root cause of this problem while on `ServerList`
        return;
    }

    session.dataSend(
        ServerResponse.versionCheck(Config.client.protocol === data.protocolVersion)
    );
}

module.exports = protocolVersion;
