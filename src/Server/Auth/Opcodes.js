const ClientRequest = invoke('Server/Auth/Request');

// Establishes an `Opcode` table to handle client packets
const Opcodes = {
    table: (() => {
        const table = new Array(0x128).fill((_, packet) => {
            utils.infoFail('AuthServer:: unknown opcode 0x%s', utils.toHex(packet[0]));
        });

        return table;
    })()
};

module.exports = Opcodes;
