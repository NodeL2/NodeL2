let net = require('net');

let ls = {
    host: '127.0.0.1',
    port: 2106
};

class ServerPacket {
    constructor(size) {
        this.buffer = new Buffer.allocUnsafe(size + 2);
        this.offset = 2;
    }

    writeC(data) {
        this.buffer.writeInt8(data, this.offset);
        this.offset += 1;

        return this;
    }

    writeD(data) {
        this.buffer.writeInt32LE(data, this.offset);
        this.offset += 4;

        return this;
    }
}

class Server {
    constructor() {
        console.info('Constructor')
    }

    start() {
        net.createServer(this.onSocket).listen(ls.port, ls.host, () => {
            console.info('LS listening on ' + ls.host + ':' + ls.port);
        });
    }

    onSocket(socket) {
        console.info('Connected to LS -> ' + socket.remoteAddress + ':' + socket.remotePort);

        socket.on('data', function(data) {
            console.info('Connection data from %s: %j', socket.remoteAddress, data);
        });

        socket.on('close', function() {
            console.log('Connection from %s closed', socket.remoteAddress);
        });

        socket.on('error', function(error) {
            console.info('Connection %s error: %s', socket.remoteAddress, error.message);
        });

        socket.setEncoding('binary');

        var packet = new ServerPacket(9);
        var packetType = 0x00;
        var protocol = 0x785a;
        var sessionID = 0x03ed779c;
        
        packet.writeC(packetType).writeD(sessionID).writeD(protocol);
        packet.buffer.writeInt16LE(packet.buffer.length);

        socket.write(packet.buffer);
    }
}

module.exports = new Server();
