const Opcodes = invoke('GameServer/Network/Opcodes');
const Actor   = invoke('GameServer/Instance/Actor');
const World   = invoke('GameServer/World');

class Session {
    constructor(socket) {
        const optn = options.connection.GameServer;

        this.socket   = socket;
        this.serverId = optn.id;

        World.insertUser(this);
    }

    setAccountId(username) {
        this.accountId = username;
    }

    setActor(properties) {
        this.actor = new Actor(properties);
    }

    dataReceive(data) {
        // Weird, sometimes the packet is sent twofold/duplicated. I had to limit it based on the header size...
        const packet = data.slice(2, data.readInt16LE());
        Opcodes.table[packet[0]](this, packet);
    }

    dataSend(data) {
        const header = Buffer.alloc(2);
        header.writeInt16LE(data.length + 2);
        this.socket.write(Buffer.concat([header, data]));
    }

    error() {
        utils.infoWarn('GameServer:: exception');
        this.actor.destructor();
    }
}

module.exports = Session;
