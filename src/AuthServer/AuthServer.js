let net = require('net');

class AuthServer {
    constructor() {

        let host = '127.0.0.1';
        let port = 2106;

        let server = net.createServer(this.onSocket).listen(2106, '127.0.0.1', () => {
            console.log('AuthServer:: initialised for %s:%d', host, port);
        });
    }

    onSocket(socket) {
        console.log(
            'AuthServer:: new connection from %s:%d', socket.remoteAddress, socket.remotePort
        );
    }
}

module.exports = AuthServer;
