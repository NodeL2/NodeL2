let net = require('net');

// User define
let Config = require('./Config');
let ServerSession = require('./ServerSession');
let ServerMethods = require('./ServerMethods');

class Server {
    constructor() {
        net.createServer(this.onSocket).listen(Config.loginServer.port, Config.loginServer.host, () => {
            console.info('LS listening on ' + Config.loginServer.host + ':' + Config.loginServer.port);
        });
    }

    onSocket(socket) {
        console.info('Connected to LS -> ' + socket.remoteAddress + ':' + socket.remotePort);

        // Callback: Received data
        socket.on('data', (data) => {
            console.log('Connection data from %s: %j', socket.remoteAddress, data);
        });

        // Callback: Connection closed
        socket.on('close', () => {
            console.log('Connection from %s closed', socket.remoteAddress);
        });

        // Callback: Unknown error
        socket.on('error', (error) => {
            console.log('Connection %s error: %s', socket.remoteAddress, error.message);
        });

        socket.setEncoding('binary');

        let session = new ServerSession(socket);
        session.sendPacket(ServerMethods.init());
    }
}

new Server();
