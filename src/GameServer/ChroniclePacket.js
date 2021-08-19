let Config       = invoke('Config');
let ServerPacket = invoke('ServerPacket');

class ChroniclePacket extends ServerPacket {
    constructor(key) {
        // Combination of Chronicle 0/1/2 packet codes
        this.values = {
              charSelected: [0x21, 0x21, 0x15],
            charSelectInfo: [0x1f, 0x1f, 0x13],
             charTemplates: [0x23, 0x23, 0x17],
            moveToLocation: [0x01, 0x01, 0x01],
                 questList: [0x98, 0x98, 0x80],
             logoutSuccess: [0x96, 0x96, 0x7e],
                   restart: [0x74, 0x74, 0x5f],
                       say: [0x5d, 0x5d, 0x4a],
             showInventory: [0x27, 0x27, 0x1b],
                   showMap: [0xb6, 0xb6, 0x9d],
              socialAction: [0x3d, 0x3d, 0x2d],
                  stopMove: [0x00, 0x59, 0x47],
                   sunrise: [0x28, 0x28, 0x1c],
                  userInfo: [0x04, 0x04, 0x04],
              versionCheck: [0x00, 0x00, 0x00],
        };

        if (!key in this.values) {
            fatalError('GS:: unknown chronicle packet code -> %s', key);
        }

        // Write correct Chronicle packet code in buffer
        super(this.values[key][Config.client.chronicle]);

        
        // this.writeC(
        //     this.values[key][Config.client.chronicle]
        // );
    }
}

module.exports = ChroniclePacket;
