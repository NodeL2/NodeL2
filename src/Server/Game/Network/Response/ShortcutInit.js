const SendPacket = invoke('Server/Packet/Send');

function shortcutInit(shortcuts) {
    const packet = new SendPacket(0x45);

    packet
        .writeD(shortcuts.length);

    for (const shortcut of shortcuts) {
        packet
            .writeD(shortcut.kind)
            .writeD(shortcut.slot)
            .writeD(shortcut.worldId);

        if (shortcut.kind === 2) {
            packet.
                writeD(0x01);
        }

        packet
            .writeD(shortcut.unknown);
    }

    return packet.fetchBuffer();
}

module.exports = shortcutInit;
