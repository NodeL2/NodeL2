let net = require('net');

// User define
let Config = require('./Config');
let ServerSession = require('./ServerSession');
let ServerMethods = require('./ServerMethods');

class Server {
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

        let session = new ServerSession(socket);
        socket.on('data', session.receiveData.bind(session));
        socket.on('close', session.connectionClosed.bind(session));
        socket.on('error', session.connectionError.bind(session));

        session.sendData(ServerMethods.handshake(), false);
    }
}

new Server();
