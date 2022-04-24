let ServerPacket = invoke('ServerPacket');
let RSA = invoke('RSA');

let modulus = RSA.fetchModulus();
let scrambledModulus = RSA.scrambleModulus(modulus);

function initLS(serverProtocol) {
    let packet = new ServerPacket(0x00);

    packet
        .writeD(0x00228afd)        // Session ID
        .writeD(serverProtocol)    // Protocol
        .writeB(scrambledModulus); // RSA Public Key

    return packet.fetchBuffer(false);
}

module.exports = initLS;
