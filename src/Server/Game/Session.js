const Opcodes = invoke('Server/Game/Opcodes');

class Session {
    constructor(socket) {
        this.socket = socket;
    }

    setAccountId(username) {
        this.accountId = username;
    }

    dataReceive(data) {
        // Weird, sometimes the packet is sent twofold/duplicated. I had to limit it based on the header size...
        const packet = data.slice(2, data.readInt16LE());
        Opcodes.table[packet[0]](this, packet);
    }

    dataSend(data, encipher = true) {
        const header = Buffer.alloc(2);
        header.writeInt16LE(data.length + 2);
        this.socket.write(Buffer.concat([header, data]));
    }

    error(err) {
        utils.infoWarn('GameServer:: exception');
        utils.infoWarn(err.stack);
    }
}

module.exports = Session;
