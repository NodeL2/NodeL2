const ServerPacket = invoke('ServerPacket');

function initLS(sessionId, serverProtocol) {
    const packet = new ServerPacket(0x00);

    packet
        .writeD(sessionId)
        .writeD(serverProtocol);

    return packet.fetchBuffer(false);
}

class AuthSession {
    constructor(socket) {
        const { AuthServer: optn } = invoke('Config');

        this.socket    = socket;
        this.sessionId = invoke('Utils').randomNumber(0x80000000);
        this.protocol  = optn.protocol;

        // First handshake from `Server` to `Client`
        this.dataSend(
            initLS(this.sessionId, this.protocol)
        );
    }

    dataReceive(data) {
        infoFail('AuthServer:: unimplemented data receiver');
    }

    dataSend(data) {
    }

    error(err) {
        infoWarn('AuthServer:: exception');
        infoWarn(err.stack);
    }
}

module.exports = AuthSession;
