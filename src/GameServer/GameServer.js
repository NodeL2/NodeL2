let net = require('net');

// User define
let Config = invoke('Config');
let GameServerSession = invoke('GameServer/GameServerSession');

class GameServer {
    constructor() {
        let host = Config.gameServer.host;
        let port = Config.gameServer.port;

        net.createServer(this.onSocket).listen(port, host, () => {
            console.log('GS:: listening on %s:%s', host, port);
        });
    }

    onSocket(socket) {
        console.log('GS:: incoming connection from %s:%s', socket.remoteAddress, socket.remotePort);

        let session = new GameServerSession(socket);
        socket.on('data', session.receiveData.bind(session));
    }
}

module.exports = GameServer;
