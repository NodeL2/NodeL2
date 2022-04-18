let AuthSession = invoke('AuthServer/Session');

class AuthServer {
    constructor() {
        let { optnAuthServer: optn } = invoke('Config');

        require('net').createServer(this.onSocket).listen(optn.port, optn.hostname, () => {
            console.log('AuthServer:: Successful init for %s:%d', optn.hostname, optn.port);
        });
    }

    onSocket(socket) {
        console.log(
            'AuthServer:: New connection received from %s:%d', socket.remoteAddress, socket.remotePort
        );

        new AuthSession(socket);
    }
}

module.exports = AuthServer;
