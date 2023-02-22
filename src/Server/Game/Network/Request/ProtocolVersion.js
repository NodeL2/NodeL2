const ServerResponse = invoke('Server/Game/Network/Response');
const ReceivePacket  = invoke('Server/Packet/Receive');

function protocolVersion(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD(); // Protocol Version

    consume(session, {
        protocolVersion: packet.data[0]
    });
}

function consume(session, data) {
    const optn = options.connection.Client;

    if (data.protocolVersion !== optn.protocol) { // TODO: Add error feedback on-screen
        utils.infoWarn('GameServer:: Protocol mismatch, expected %d, provided %d', optn.protocol, data.protocolVersion);
    }

    session.dataSend(
        ServerResponse.cipherInit()
    );
}

module.exports = protocolVersion;
