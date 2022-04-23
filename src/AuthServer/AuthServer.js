let AuthSession = invoke('AuthServer/Session');

class AuthServer {
    constructor() {
        let optn = invoke('Config').authServer;

        require('net').createServer(this.onSocket).listen(optn.port, optn.hostname, () => {
            console.log('AuthServer:: successful init for %s:%d', optn.hostname, optn.port);
        });
    }

    onSocket(socket) {
        console.log(
            'AuthServer:: new connection received from %s:%d', socket.remoteAddress, socket.remotePort
        );

        new AuthSession(socket);
    }
}

module.exports = AuthServer;
