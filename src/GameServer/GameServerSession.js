// User define
let Actor = invoke('Actor');
let Blowfish = invoke('Blowfish');
let Config = invoke('Config');
let Database = invoke('Database');
let GameClientRequest = invoke('GameServer/GameClientRequest');
let Utils = invoke('Utils');

class GameServerSession {
    constructor(socket) {
        this.socket = socket;
        this.player = new Actor();
    }

    sendData(data, encrypt = true) {
        let header = new Buffer.from([0x00, 0x00]);
        header.writeInt16LE(data.length + 2);

        this.socket.write(
            Buffer.concat([header, encrypt ? Blowfish.encrypt(data) : data]) // encryptedPacket
        )
    }

    receiveData(data) {
        let packet = new Buffer.from(data, 'binary').slice(2);

        // Opcodes
        switch (packet[0]) {
            case 0x00: // Protocol Version
                GameClientRequest.protocolVersion(this, packet);
                break;

            case 0x01: // Move to Location
                GameClientRequest.moveToLocation(this, packet);
                break;

            case 0x03: // Enter World
                GameClientRequest.enterWorld(this, packet);
                break;

            case 0x04: // Action
                GameClientRequest.action(this, packet);
                break;

            case 0x08: // Authorize Login
                GameClientRequest.authorizeLogin(this, packet);
                break;

            case 0x09: // Logout
                GameClientRequest.logout(this, packet);
                break;

            case 0x0b: // Create Character
                GameClientRequest.charCreate(this, packet);
                break;

            case 0x0d: // Character Selected
                GameClientRequest.charSelected(this, packet);
                break;

            case 0x0e: // New Character
                GameClientRequest.newCharacter(this, packet);
                break;

            case 0x0f: // Show Inventory
                GameClientRequest.showInventory(this, packet);
                break;

            case 0x1b: // Social Action
                GameClientRequest.socialAction(this, packet);
                break;

            case 0x36: // Stop Move
                GameClientRequest.stopMove(this, packet);
                break;

            case 0x37: // Target Cancel
                GameClientRequest.targetCancel(this, packet);
                break;

            case 0x38: // Say
                GameClientRequest.say(this, packet);
                break;

            case 0x45: // Request Action Use
                GameClientRequest.actionUse(this, packet);
                break;

            case 0x46: // Restart?
                break;

            case 0x48: // Validate Position
                GameClientRequest.validatePosition(this, packet);
                break;

            case 0x63: // Quest List
                GameClientRequest.questList(this, packet);
                break;

            default:
                console.log('GS:: unknown opcode 0x%s', Utils.toHex(packet[0], 2));
                break;
        }
    }
}

module.exports = GameServerSession;
