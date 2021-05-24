let net = require('net');

// User define
let Config = require('./Config');
let GameServerSession = require('./GameServerSession');

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
        //socket.setEncoding('binary');

        let session = new GameServerSession(socket);
        socket.on('data', session.receiveData.bind(session));
    }
}

//new GameServer();
module.exports = GameServer;
