const ServerResponse = invoke('GameServer/Network/Response');
const ReceivePacket  = invoke('Packet/Receive');

function protocolVersion(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD(); // Protocol Version

    consume(session, {
        protocolVersion: packet.data[0]
    });
}

function consume(session, data) {
    const optn = options.default.General;

    if (data.protocolVersion !== optn.protocol) { // TODO: Add error feedback on-screen
        utils.infoWarn('GameServer', 'Protocol mismatch, expected %d, provided %d', optn.protocol, data.protocolVersion);
    }

    session.dataSend(
        ServerResponse.cipherInit()
    );
}

module.exports = protocolVersion;
