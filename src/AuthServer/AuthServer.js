let net = require('net');

// User define
let Config = require(__basedir + '/src/Config');
let AuthServerSession = require(__basedir + '/src/AuthServer/AuthServerSession');
let AuthServerMethods = require(__basedir + '/src/AuthServer/AuthServerMethods');
let GameServer = require(__basedir + '/src/GameServer/GameServer');

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

module.exports = AuthServer;
