let AuthSession = invoke('AuthServer/Session');

class AuthServer {
    constructor() {
        let { optnAuthServer } = invoke('Config');

        let host = optnAuthServer.hostname;
        let port = optnAuthServer.port;

        require('net').createServer(this.onSocket).listen(port, host, () => {
            console.log('AuthServer:: Successful init for %s:%d', host, port);
        });
    }

    onSocket(socket) {
        console.log(
            'AuthServer:: New connection received from %s:%d', socket.remoteAddress, socket.remotePort
        );

        let session = new AuthSession(socket);
    }
}

module.exports = AuthServer;
