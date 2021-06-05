let net = require('net');

// User define
let Config = invoke('Config');
let GameServerSession = invoke('GameServer/GameServerSession');
let World = invoke('GameServer/World');

class GameServer {
    constructor() {
        // Start with world
        World.initialize();

        let host = Config.gameServer.host;
        let port = Config.gameServer.port;

        net.createServer(this.onSocket).listen(port, host, () => {
            console.log('GS:: listening on %s:%s', host, port);
        });

        // 277.77777777777777

        // console.log(345 / 1.2420); // Human Fighter
        // console.log(303 / 1.0908); // Human Mage
        // console.log(330 / 1.1880); // Elf Fighter
        // console.log(312 / 1.1232); // Elf Mage
        // console.log(342 / 1.2312); // Dark Elf Fighter
        // console.log(309 / 1.1124); // Dark Elf Mage
        // console.log(318 / 1.1448); // Orc Fighter
        // console.log(312 / 1.1232); // Orc Mage
        // console.log(327 / 1.1772); // Dwarven Fighter

        //console.log(327 / 277.77777777777777);
    }

    onSocket(socket) {
        console.log('GS:: incoming connection from %s:%s', socket.remoteAddress, socket.remotePort);

        let session = new GameServerSession(socket);
        socket.on('data', session.receiveData.bind(session));
    }
}

module.exports = GameServer;
