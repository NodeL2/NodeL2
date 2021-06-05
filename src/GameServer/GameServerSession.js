let Actor = invoke('GameServer/Actor');
let Blowfish = invoke('Blowfish');
let Config = invoke('Config');
let Database = invoke('Database');
let GameClientRequest = invoke('GameServer/GameClientRequest');
let Utils = invoke('Utils');

class GameServerSession {
    constructor(socket) {
        this.socket = socket;
        this.accountId = '';
    }

    initPlayer() {
        this.player = new Actor();
    }

    sendData(data, encrypt = false) {
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
            case PacketType.PROTOCOL_VER:
                GameClientRequest.protocolVersion(this, packet);
                break;

            case PacketType.MOVE_TO:
                GameClientRequest.moveToLocation(packet)
                    .then((data) => {
                        this.player.move(this, data);
                    });
                break;

            case PacketType.ENTER_WORLD:
                GameClientRequest.enterWorld(this, packet);
                break;

            case PacketType.ACTION:
                GameClientRequest.action(packet)
                    .then((data) => {
                        this.player.select(this, data);
                    });
                break;

            case PacketType.AUTH_LOGIN:
                GameClientRequest.authorizeLogin(this, packet);
                break;

            case PacketType.LOGOUT:
                GameClientRequest.logout(this, packet);
                break;

            case PacketType.ATTACK:
                GameClientRequest.attack(packet)
                    .then((data) => {
                        this.player.attack(this, data);
                    });
                break;

            case PacketType.CREATE_CHAR:
                GameClientRequest.charCreate(this, packet);
                break;

            case PacketType.CHAR_SELECTED:
                GameClientRequest.charSelected(this, packet);
                break;

            case PacketType.NEW_CHAR:
                GameClientRequest.newCharacter(this, packet);
                break;

            case PacketType.SHOW_INVENTORY:
                GameClientRequest.showInventory(this, packet);
                break;

            case PacketType.UNEQUIP:
                GameClientRequest.unequipItem(this, packet);
                break;

            case PacketType.USE_ITEM:
                GameClientRequest.useItem(this, packet);
                break;

            case PacketType.SOCIAL_ACTION:
                GameClientRequest.socialAction(packet)
                    .then((data) => {
                        this.player.socialAction(this, data);
                    });
                break;

            case PacketType.ADD_SHORTCUT:
                GameClientRequest.addShortcut(this, packet);
                break;

            case PacketType.STOP_MOVE:
                GameClientRequest.stopMove(this, packet);
                break;

            case PacketType.TARGET_CANCEL:
                GameClientRequest.targetCancel(packet)
                    .then((data) => {
                        this.player.unselect(this, data);
                    })
                break;

            case PacketType.SAY:
                GameClientRequest.say(this, packet);
                break;

            case PacketType.ACTION_USE:
                GameClientRequest.actionUse(packet)
                    .then((data) => {
                        this.player.action(this, data);
                    });
                break;

            case PacketType.RESTART:
                GameClientRequest.restart(this, packet);
                break;

            case PacketType.VALIDATE_POS:
                GameClientRequest.validatePosition(this, packet);
                break;

            case PacketType.SHOW_BOARD:
                GameClientRequest.showBoard(this, packet);
                break;

            case PacketType.QUEST_LIST:
                GameClientRequest.questList(this, packet);
                break;

            default:
                console.log('GS:: unknown opcode 0x%s', Utils.toHex(packet[0], 2));
                break;
        }
    }
}

module.exports = GameServerSession;
