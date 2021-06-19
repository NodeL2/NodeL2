let AuthSession = invoke('AuthServer/Session');
let Config = invoke('Config');

// Module imports
let net = require('net');

class AuthServer {
    constructor() {

        let host = Config.authServer.host;
        let port = Config.authServer.port;

        this.server = net.createServer(this.onSocket).listen(port, host, () => {
            console.log('AuthServer:: initialised for %s:%d', host, port);
        });
    }

    onSocket(socket) {
        console.log(
            'AuthServer:: new connection from %s:%d', socket.remoteAddress, socket.remotePort
        );

        let session = new AuthSession(socket);
        socket.on('data', session.receiveData.bind(session));
    }
}

module.exports = AuthServer;
