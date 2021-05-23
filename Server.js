let net = require('net');
let crypto = require('crypto');

// User define
let Config = require('./Config');
let ServerSession = require('./ServerSession');
let ServerMethods = require('./ServerMethods');
let ClientMethods = require('./ClientMethods');

class Server {
    constructor() {
        net.createServer(this.onSocket).listen(Config.loginServer.port, Config.loginServer.host, () => {
            console.info('LS:: listening on %s:%s', Config.loginServer.host, Config.loginServer.port);
        });
    }

    onSocket(socket) {
        console.info('LS:: incoming connection from %s:%s', socket.remoteAddress, socket.remotePort);

        // Callback: Received data
        socket.on('data', (data) => {
            let packet = new Buffer.from(data, 'binary').slice(2).swap32();
            let decipher = crypto.createDecipheriv('bf-ecb', Config.blowfishKey, '');
            decipher.setAutoPadding(false);
            packet = Buffer.concat([decipher.update(packet), decipher.final()]).swap32();

            let opcode = packet[0];

            switch (opcode) {
                case 0x00:
                    let hi = ClientMethods.authorizeLogin(packet);
                    console.log(hi);
                    break;

                default:
                    console.log('Unknown opcode -> 0x%s', Number(opcode).toString(16).padStart(2, '0'));
                    break;
            }
        });

        // Callback: Connection closed
        socket.on('close', () => {
            console.log('LS:: connection from %s:%s closed', socket.remoteAddress, socket.remotePort);
        });

        // Callback: Unknown error
        socket.on('error', (error) => {
            console.log('Connection %s error: %s', socket.remoteAddress, error.message);
        });

        socket.setEncoding('binary');

        let session = new ServerSession(socket);
        session.sendPacket(ServerMethods.handshake(), false);
    }
}

new Server();
