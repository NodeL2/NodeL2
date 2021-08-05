let Config       = invoke('Config');
let ServerPacket = invoke('ServerPacket');

class ChroniclePacket extends ServerPacket {
    constructor(key, size) {
        super(size);

        this.values = {
              charSelected: [0x21, 0x15],
            charSelectInfo: [0x1f, 0x13],
             charTemplates: [0x23, 0x17],
                 questList: [0x98, 0x80],
                   sunrise: [0x28, 0x1c],
                  userInfo: [0x04, 0x04],
              versionCheck: [0x00, 0x00],
        };

        if (!(key in this.values)) {
            console.log('GS:: chronicle packet code invalid -> %s', key)
            process.exit();
        }
        
        let code = this.values[key][Config.client.chronicle - 1];
        this.buffer.writeUInt8(code, this.offset);
        this.offset += 1;
    }
}

module.exports = ChroniclePacket;
