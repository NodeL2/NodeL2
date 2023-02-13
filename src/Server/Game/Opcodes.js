const ClientRequest = invoke('Server/Game/Request');

// Establishes an `Opcode` table to handle client packets
const Opcodes = {
    table: (() => {
        const table = new Array(0xff).fill((_, packet) => {
            utils.infoFail('GameServer:: unknown opcode 0x%s', utils.toHex(packet[0]));
        });

        table[0x00] = ClientRequest.protocolVersion;
        table[0x08] = ClientRequest.authLogin;
        table[0x09] = ClientRequest.logout;
        table[0x0b] = ClientRequest.createNewChar;
        table[0x0c] = ClientRequest.charDelete;
        table[0x0d] = ClientRequest.enterWorld;
        table[0x0e] = ClientRequest.enterCharCreation;

        return table;
    })()
};

module.exports = Opcodes;
