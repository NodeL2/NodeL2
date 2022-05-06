let ClientRequest = invoke('Server/Game/Request');
let Utils = invoke('Utils');

// Establishes an `Opcode` table to handle client packets
const Opcodes = {
    table: (() => {
        let table = new Array(0xff).fill((_, decryptedPacket) => {
            fatalError('GameServer:: unknown opcode 0x%s', Utils.toHex(decryptedPacket[0], 2));
        });

        table[0x00] = ClientRequest.protocolVersion;
        table[0x08] = ClientRequest.authLogin;
        table[0x0d] = ClientRequest.charSelected;
        table[0x0e] = ClientRequest.charCreationScreen;

        return table;
    })()
};

module.exports = Opcodes;
