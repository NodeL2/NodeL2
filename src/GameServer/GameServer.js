let GameSession = invoke('GameServer/Session');
let Config      = invoke('Config');

class GameServer {
    constructor() {
        let config = Config.gameServer;

        require('net').createServer(this.onSocket).listen(config.port, config.host, () => {
            console.log('GameServer:: initialised for %s:%d', config.host, config.port);
        });
    }

    onSocket(socket) {
        console.log(
            'GameServer:: new connection from %s:%d', socket.remoteAddress, socket.remotePort
        );

        let session = new GameSession(socket);
        socket.on('data', session.receiveData.bind(session));
    }
}

module.exports = GameServer;
