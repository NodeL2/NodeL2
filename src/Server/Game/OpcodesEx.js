const ClientRequestEx = invoke('Server/Game/Request/Ex');
const Utils           = invoke('Utils');

// Establishes an `OpcodeEx` table to handle client packets
const OpcodesEx = {
    table: (() => {
        const table = new Array(0x128).fill((_, packet) => {
            infoFail('GameServer:: unknown extended opcode 0x%s', Utils.toHex(packet.readUInt16LE()));
        });

        table[0x001] = (_, packet) => {}; // Manor List
        table[0x021] = (_, packet) => {}; // Key Mapping
        table[0x033] = ClientRequestEx.backToHall;
        table[0x03a] = (_, packet) => {}; // All Fortress Info
        table[0x0a9] = ClientRequestEx.charNameCreatable;
        table[0x103] = (_, packet) => {}; // Executed UI Events Count

        return table;
    })()
};

module.exports = OpcodesEx;
