let net = require('net');

// User define
let Config = require('./Config');
let AuthServerSession = require('./AuthServerSession');
let AuthServerMethods = require('./AuthServerMethods');
let GameServer = require('./GameServer');

class AuthServer {
    constructor() {
        let host = Config.loginServer.host;
        let port = Config.loginServer.port;

        net.createServer(this.onSocket).listen(port, host, () => {
            console.log('LS:: listening on %s:%s', host, port);
        });
    }

    onSocket(socket) {
        console.log('LS:: incoming connection from %s:%s', socket.remoteAddress, socket.remotePort);
        //socket.setEncoding('binary');

        let session = new AuthServerSession(socket);
        socket.on('data', session.receiveData.bind(session));
        socket.on('close', session.connectionClosed.bind(session));
        socket.on('error', session.connectionError.bind(session));

        session.sendData(AuthServerMethods.handshake(), false);
    }
}

new AuthServer();
new GameServer(); // Temp
