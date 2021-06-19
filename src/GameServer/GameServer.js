class GameServer {
    constructor() {

        let host = '127.0.0.1';
        let port = 7777;

        let server = net.createServer(this.onSocket).listen(2106, '127.0.0.1', () => {
            console.log('GameServer:: initialised for %s:%d', host, port);
        });
    }

    onSocket(socket) {
        console.log(
            'GameServer:: new connection from %s:%d', socket.remoteAddress, socket.remotePort
        );
    }
}

module.exports = GameServer;
