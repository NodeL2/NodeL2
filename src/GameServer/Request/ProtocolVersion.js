let ClientPacket = invoke('ClientPacket');
let Config = invoke('Config');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function protocolVersion(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD(); // Protocol Version

    let data = {
        protocolVersion: packet.data[1]
    };

    if (data.protocolVersion === Config.protocolVersion) {
        session.sendData(
            GameServerResponse.cryptInit(Config.xorKey), false
        );
    }
}

module.exports = protocolVersion;
