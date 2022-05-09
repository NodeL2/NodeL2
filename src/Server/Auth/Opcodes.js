let ClientRequest = invoke('Server/Auth/Request');
let Utils = invoke('Utils');

// Establishes an `Opcode` table to handle client packets
const Opcodes = {
    table: (() => {
        let table = new Array(0xff).fill((_, decryptedPacket) => {
            fatalError('AuthServer:: unknown opcode 0x%s', Utils.toHex(decryptedPacket[0], 2));
        });

        table[0x00] = ClientRequest.authLogin;
        table[0x02] = ClientRequest.gameLogin;
        table[0x05] = ClientRequest.serverList;
        table[0x07] = ClientRequest.authGG;

        return table;
    })()
};

module.exports = Opcodes;
