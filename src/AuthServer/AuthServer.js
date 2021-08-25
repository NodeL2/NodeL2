let AuthSession    = invoke('AuthServer/Session');
let ServerResponse = invoke('AuthServer/Response');

// Module imports
let net = require('net');

class AuthServer {
    constructor(config) {
        // Keep reference until `initLS` method call
        this.serverProtocol = config.protocol;

        net.createServer(this.onSocket).listen(config.port, config.host, () => {
            console.log('AuthServer:: initialised for %s:%d', config.host, config.port);
        });
    }

    onSocket(socket) {
        console.log(
            'AuthServer:: new connection from %s:%d', socket.remoteAddress, socket.remotePort
        );

        let session = new AuthSession(socket);
        socket.on('data', session.receiveData.bind(session));

        // First handshake with client
        session.sendData(
            ServerResponse.initLS(this.serverProtocol), false
        );
    }
}

module.exports = AuthServer;
