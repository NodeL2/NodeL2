let ClientPacket = invoke('ClientPacket');

function addShortcut(session, buffer) {
    return new Promise((success) => {
        let packet = new ClientPacket(buffer);

        packet
            .readC()
            .readD()  // Type
            .readD()  // Slot
            .readD()  // ID
            .readD(); // Unknown

        return success({
            type    : packet.data[1],
            slot    : packet.data[2],
            id      : packet.data[3],
            unknown : packet.data[4],
        });
    });
}

module.exports = addShortcut;
