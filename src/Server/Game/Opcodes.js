const ClientRequest = invoke('Server/Game/Request');

// Establishes an `Opcode` table to handle client packets
const Opcodes = {
    table: (() => {
        const table = new Array(0xff).fill((_, packet) => {
            utils.infoFail('GameServer:: unknown opcode 0x%s', utils.toHex(packet[0]));
        });

        table[0x00] = ClientRequest.protocolVersion;
        table[0x08] = ClientRequest.authLogin;

        return table;
    })()
};

module.exports = Opcodes;
