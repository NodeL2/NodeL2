const ClientRequest = invoke('GameServer/Network/Request');

// Establishes an `Opcode` table to handle client packets
const Opcodes = {
    table: (() => {
        const table = utils.tupleAlloc(0xff, (_, packet) => {
            utils.infoFail('GameServer :: unknown Opcode 0x%s', utils.toHex(packet[0]));
        });

        table[0x00] = ClientRequest.protocolVersion;
        table[0x01] = ClientRequest.moveToLocation;
        table[0x03] = ClientRequest.enterWorld;
        table[0x04] = ClientRequest.action;
        table[0x08] = ClientRequest.authLogin;
        table[0x09] = ClientRequest.logout;
        table[0x0a] = ClientRequest.attack;
        table[0x0b] = ClientRequest.createNewChar;
        table[0x0c] = ClientRequest.charDelete;
        table[0x0d] = ClientRequest.charSelected;
        table[0x0e] = ClientRequest.enterCharCreation;
        table[0x0f] = ClientRequest.itemsList;
        table[0x11] = ClientRequest.unequipItem;
        table[0x14] = ClientRequest.useItem;
        table[0x1b] = ClientRequest.socialAction;
        table[0x1f] = ClientRequest.purchase;
        table[0x21] = ClientRequest.htmlLink;
        table[0x2f] = ClientRequest.skillUse;
        table[0x30] = ClientRequest.appeared;
        table[0x33] = ClientRequest.addShortcut;
        table[0x35] = ClientRequest.removeShortcut;
        table[0x36] = ClientRequest.stopMove;
        table[0x37] = ClientRequest.destCancel;
        table[0x38] = ClientRequest.speak;
        table[0x3f] = ClientRequest.skillsList;
        table[0x45] = ClientRequest.actionUse;
        table[0x46] = ClientRequest.restart;
        table[0x48] = ClientRequest.validatePosition;
        table[0x59] = ClientRequest.trashItem;
        table[0x63] = ClientRequest.questList;
        table[0x6d] = ClientRequest.restartPoint;
        table[0xcd] = ClientRequest.showMap;

        table[0x57] = () => {}; // Board
        table[0x9d] = () => {}; // Skill Cool Time, not needed?
        table[0xb9] = () => {}; // Recommend button
        table[0xc1] = () => {}; // Macro

        table[0x4b] = () => {}; // ?
        table[0xd0] = () => {}; // ?

        table[0x4b] = () => {}; // ?
        table[0xcd] = () => {}; // Map?
        table[0xd0] = () => {}; // ?

        return table;
    })()
};

module.exports = Opcodes;
