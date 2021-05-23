let net = require('net');

// User define
let Config = require('./Config');
let ServerSession = require('./ServerSession');
let ServerMethods = require('./ServerMethods');

class Server {
    constructor() {
        net.createServer(this.onSocket).listen(Config.loginServer.port, Config.loginServer.host, () => {
            console.log('LS:: listening on %s:%s', Config.loginServer.host, Config.loginServer.port);
        });
    }

    onSocket(socket) {
        console.log('LS:: incoming connection from %s:%s', socket.remoteAddress, socket.remotePort);
        socket.setEncoding('binary');

        let session = new ServerSession(socket);
        socket.on( 'data', session.receiveData.bind(session));
        socket.on('close', session.connectionClosed.bind(session));
        socket.on('error', session.connectionError.bind(session));

        session.sendData(ServerMethods.handshake(), false);
    }
}

new Server();
