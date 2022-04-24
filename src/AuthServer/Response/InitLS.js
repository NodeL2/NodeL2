let ServerPacket = invoke('ServerPacket');
let RSA = invoke('RSA');

function initLS(serverProtocol) {
    let packet = new ServerPacket(0x00);

    let scrambledModulus = RSA.scrambleModulus(
        RSA.fetchModulus()
    );

    packet
        .writeD(0x00228afd)        // Session ID
        .writeD(serverProtocol)    // Protocol
        .writeB(scrambledModulus); // RSA Public Key

    return packet.fetchBuffer(false);
}

module.exports = initLS;
