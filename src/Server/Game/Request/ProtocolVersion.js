const ServerResponse = invoke('Server/Game/Response');
const ClientPacket   = invoke('Packet/Client');

function protocolVersion(session, buffer) {
    const packet = new ClientPacket(buffer);

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

    // TODO: Match protocol version prior to this
    session.dataSend(
        ServerResponse.cipherInit()
    );
}

module.exports = protocolVersion;
