const ClientRequest = invoke('Server/Game/Request');
const OpcodesEx     = invoke('Server/Game/OpcodesEx');
const Utils         = invoke('Utils');

// Establishes an `Opcode` table to handle client packets
const Opcodes = {
    table: (() => {
        const table = new Array(0x128).fill((_, packet) => {
            infoFail('GameServer:: unknown opcode 0x%s', Utils.toHex(packet[0]));
        });

        table[0x00] = ClientRequest.logout;
        table[0x0c] = ClientRequest.createNewChar;
        table[0x0d] = ClientRequest.charDelete;
        table[0x0e] = ClientRequest.protocolVersion;
        table[0x0f] = ClientRequest.moveToLocation;
        table[0x11] = ClientRequest.enterWorld;
        table[0x12] = ClientRequest.charSelected;
        table[0x13] = ClientRequest.charCreationScreen;
        table[0x14] = ClientRequest.itemList;
        table[0x2b] = ClientRequest.authLogin;
        table[0x34] = ClientRequest.socialAction;
        table[0x56] = ClientRequest.actionUse;
        table[0x57] = ClientRequest.restart;
        table[0x59] = ClientRequest.validatePosition;
        table[0x5c] = (_, packet) => {}; // Finish Rotating
        table[0x62] = ClientRequest.questList;

        // Extended opcodes
        table[0xd0] = (session, packet) => {
            OpcodesEx.table[packet.readUInt16LE(1)](session, packet.slice(1));
        };

        return table;
    })()
};

module.exports = Opcodes;
