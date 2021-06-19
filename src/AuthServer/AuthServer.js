let net = require('net');
let AuthSession = invoke('AuthServer/Session');

class AuthServer {
    constructor() {

        let host = '127.0.0.1';
        let port = 2106;

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
