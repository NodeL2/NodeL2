//const ClientRequest = invoke('Server/Auth/Request');
const Utils         = invoke('Utils');

// Establishes an `Opcode` table to handle client packets
const Opcodes = {
    table: (() => {
        const table = new Array(0x128).fill((_, packet) => {
            infoFail('AuthServer:: unknown opcode 0x%s', Utils.toHex(packet[0]));
        });

        return table;
    })()
};

module.exports = Opcodes;
