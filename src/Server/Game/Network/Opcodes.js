const ClientRequest = invoke('Server/Game/Network/Request');

// Establishes an `Opcode` table to handle client packets
const Opcodes = {
    table: (() => {
        const table = new Array(0xff).fill((_, packet) => {
            utils.infoFail('GameServer:: unknown opcode 0x%s', utils.toHex(packet[0]));
        });

        table[0x00] = ClientRequest.protocolVersion;
        table[0x01] = ClientRequest.moveToLocation;
        table[0x03] = ClientRequest.enterWorld;
        table[0x04] = ClientRequest.action;
        table[0x08] = ClientRequest.authLogin;
        table[0x09] = ClientRequest.logout;
        table[0x0b] = ClientRequest.createNewChar;
        table[0x0c] = ClientRequest.charDelete;
        table[0x0d] = ClientRequest.charSelected;
        table[0x0e] = ClientRequest.enterCharCreation;
        table[0x0f] = ClientRequest.itemsList;
        table[0x11] = ClientRequest.unequipItem;
        table[0x1b] = ClientRequest.socialAction;
        table[0x2f] = ClientRequest.skillUse;
        table[0x36] = ClientRequest.stopMove;
        table[0x37] = ClientRequest.destCancel;
        table[0x38] = ClientRequest.speak;
        table[0x3f] = ClientRequest.skillsList;
        table[0x45] = ClientRequest.actionUse;
        table[0x46] = ClientRequest.restart;
        table[0x48] = ClientRequest.validatePosition;
        table[0x63] = ClientRequest.questList;
        table[0x9d] = (_, packet) => {}; // Skill Cool Time

        return table;
    })()
};

module.exports = Opcodes;
