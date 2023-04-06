const Opcodes = invoke('GameServer/Network/Opcodes');
const Actor   = invoke('GameServer/Actor/Actor');
const World   = invoke('GameServer/World/World');

class Session {
    constructor(socket) {
        const optn = options.default.GameServer;

        this.socket   = socket;
        this.serverId = optn.id;
    }

    setAccountId(username) {
        this.accountId = username;
        World.insertUser(this);
    }

    setActor(properties) {
        this.actor = new Actor(this, properties);
    }

    fetchAccountId() {
        return this.accountId;
    }

    dataReceive(data) {
        // Weird, sometimes the packet is sent twofold/duplicated. I had to limit it based on the header size...
        const packet = data.slice(2, data.readInt16LE());
        Opcodes.table[packet[0]](this, packet);
    }

    dataSend(data) {
        const header = Buffer.alloc(2);
        header.writeInt16LE(utils.size(data) + 2);
        this.socket.write(Buffer.concat([header, data]));
    }

    error() {
        utils.infoWarn('GameServer', 'exception');
        this.actor?.destructor();
    }
}

module.exports = Session;
