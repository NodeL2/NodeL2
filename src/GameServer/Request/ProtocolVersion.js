let ClientPacket   = invoke('ClientPacket');
let ServerResponse = invoke('GameServer/Response');

function protocolVersion(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readD(); // Protocol Version

    consume(session, {
        protocolVersion: packet.data[0]
    });
}

function consume(session, data) { // TODO: Proper check on final code
    session.sendData(
        ServerResponse.versionCheck(data.protocolVersion >= 419)
    );
}

module.exports = protocolVersion;
