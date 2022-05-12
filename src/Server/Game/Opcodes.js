let ClientRequest = invoke('Server/Game/Request');
let Utils = invoke('Utils');

// Establishes an `Opcode` table to handle client packets
const Opcodes = {
    table: (() => {
        let table = new Array(0xff).fill((_, decipheredPacket) => {
            fatalError('GameServer:: unknown opcode 0x%s', Utils.toHex(decipheredPacket[0]));
        });

        table[0x0e] = ClientRequest.protocolVersion;
        table[0x11] = ClientRequest.enterWorld;
        table[0x12] = ClientRequest.charSelected;
        table[0x13] = ClientRequest.charCreationScreen;
        table[0x2b] = ClientRequest.authLogin;

        // TODO: Not handled
        table[0xd0] = (_, x) => {}; // Ex

        return table;
    })()
};

module.exports = Opcodes;
