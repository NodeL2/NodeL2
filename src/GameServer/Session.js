let Actor         = invoke('GameServer/Actor/Actor');
let ClientRequest = invoke('GameServer/Request');
let Utils         = invoke('Utils');

class Session {
    constructor(socket) {
        this.socket  = socket;
        this.opcodes = [];

        this.createOpcodeTable()
    }

    initPlayer() {
        this.player = new Actor();
    }

    createOpcodeTable() {
        for (var i = 0; i < 0xff; i++) {
            this.opcodes[i] = this.unknownOpcode;
        }

        this.opcodes[0x00] = ClientRequest.protocolVersion;
        this.opcodes[0x03] = ClientRequest.enterWorld;
        this.opcodes[0x08] = ClientRequest.authoriseLogin;
        this.opcodes[0x0b] = ClientRequest.createNewChar;
        this.opcodes[0x0d] = ClientRequest.charSelected;
        this.opcodes[0x0e] = ClientRequest.charCreationScreen;
        this.opcodes[0x63] = ClientRequest.questList;
    }

    unknownOpcode(session, decryptedPacket) {
        console.log('GameServer:: unknown opcode 0x%s', Utils.toHex(decryptedPacket[0], 2));
    }

    receiveData(data) {
        let decryptedPacket = Buffer.from(data).slice(2);
        this.opcodes[decryptedPacket[0]](this, decryptedPacket);
    }

    sendData(data) {
        let header = Buffer.alloc(2);
        header.writeInt16LE(data.length + 2);

        this.socket.write(
            Buffer.concat([header, data])
        );
    }
}

module.exports = Session;
