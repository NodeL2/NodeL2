let Actor         = invoke('GameServer/Actor/Actor');
let ClientRequest = invoke('GameServer/Request');
let Utils         = invoke('Utils');

class Session {
    constructor(socket) {
        this.socket    = socket;
        this.accountId = '';
    }

    initPlayer() {
        this.player = new Actor();
    }

    receiveData(data) {
        let decryptedPacket = Buffer.from(data).slice(2);

        // Opcodes
        switch (decryptedPacket[0]) {
            case 0x00:
                ClientRequest.protocolVersion(this, decryptedPacket);
                break;

            case 0x08:
                ClientRequest.authoriseLogin(this, decryptedPacket);
                break;

            case 0x0b:
                ClientRequest.createNewChar(this, decryptedPacket);
                break;

            case 0x0d:
                ClientRequest.charSelected(this, decryptedPacket);
                break;

            case 0x0e:
                ClientRequest.charCreationScreen(this, decryptedPacket);
                break;

            default:
                console.log('GameServer:: unknown opcode 0x%s', Utils.toHex(decryptedPacket[0], 2));
                break;
        }
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
