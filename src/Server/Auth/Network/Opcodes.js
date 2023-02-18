const ClientRequest = invoke('Server/Auth/Network/Request');

// Establishes an `Opcode` table to handle client packets
const Opcodes = {
    table: (() => {
        const table = utils.tupleAlloc(0xff, (_, packet) => {
            utils.infoFail('AuthServer:: unknown opcode 0x%s', utils.toHex(packet[0]));
        });

        table[0x00] = ClientRequest.authLogin;
        table[0x02] = ClientRequest.gameLogin;
        table[0x05] = ClientRequest.serverList;

        return table;
    })()
};

module.exports = Opcodes;
