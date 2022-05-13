const ClientRequest = invoke('Server/Auth/Request');
const Utils = invoke('Utils');

// Establishes an `Opcode` table to handle client packets
const Opcodes = {
    table: (() => {
        const table = new Array(0xff).fill((_, packet) => {
            fatalError('AuthServer:: unknown opcode 0x%s', Utils.toHex(packet[0]));
        });

        table[0x00] = ClientRequest.authLogin;
        table[0x02] = ClientRequest.gameLogin;
        table[0x05] = ClientRequest.serverList;
        table[0x07] = ClientRequest.authGG;

        return table;
    })()
};

module.exports = Opcodes;
