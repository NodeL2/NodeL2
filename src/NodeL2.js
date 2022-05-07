require('./Globals');

// User imports
let AuthSession = invoke('Server/Auth/Session');
let GameSession = invoke('Server/Game/Session');
let Config      = invoke('Config');
let Database    = invoke('Database');
let Server      = invoke('Server');
let Utils       = invoke('Utils');

console.log('# ================================');
console.log('# Server Name: ...... NodeL2 [768]');
console.log('# Build Revision: ... %s', Utils.buildNumber());
console.log('# Chronicle: ........ C5');
console.log('# Build date: ....... %s', Utils.currentDate());
console.log('# NodeJS version: ... %s', Utils.nodeVersion());
console.log('# ================================\n');

// Startup procedure, first `Database`, then `AuthServer`, finally `GameServer`
Database.init(() => {
    new Server('AuthServer', Config.authServer, (socket) => { return new AuthSession(socket); });
    new Server('GameServer', Config.gameServer, (socket) => { return new GameSession(socket); });
});

//let buf = Buffer.from([0, 0, 0, 92, -97, -20, 0, 0, 0, 0, 68, 35, -54, 0, -52, -114, 25, 32, -69, 33, -102, 71, 106, 91, 21, -96, 2, 103, -29, 56, 0, -49, -28, -15, 92, 113, -98, -74, -1, -48, 28, -112, 10, -39, -116, 108, 68, 25, -60, -32, -123, -13, 14, 101, 96, 114, -30, 35, 46, -98, -72, 63, -53, 100, -123, 21, -45, 18, 114, -8, -13, 41, 58, -8, 66, 43, 91, 122, -7, -125, 28, 125, 65, -123, -37, 59, 6, 107, 4, 4, 25, -90, 36, -84, 79, -73, 91, -108, 92, 85, -47, -43, -16, 45, 116, -80, 25, 75, 125, 22, 119, -128, 4, -66, -52, -86, -20, -91, 53, -89, 51, -112, -59, -113, -5, 113, -21, -11, -54, 61, -82, 60, -36, 18, 124, 99, -14, -79, 78, -63, -41, -8, 52, -63, -41, -8, 52, -63, -41, -8, 52, -63, -41, -8, 52, 71, 88, 15, -44, 44, -56, -59, -15, -73, 25, -83, -64, -117, -14, 65, 109, -24, -98, 45, 1, -24, -98, 45, 1, -24, -98, 45, 1, -24, -98, 45, 1, -24, -98, 45]);
//
//invoke('Utils').dumpBuffer(buf);
//console.log(buf.byteLength);

// 00 00 00 5c 9f ec 44 21 c6 00 00 51 33 1f 55 6e 90 98 d1 78 89 e7 94 81 49 47 02 d6 c7 e9 bc 1f 61 98 51 5e 8d 26 f9 f9 67 c4 36 de 48 0c 3f 89 31 c2 e5 bd ac bb 86 1b a5 36 e5 fa 3d d5 04 89 a8 7d a2 fa ab 4f cd f0 70 a2 3b a9 a8 90 c6 f8 37 49 bb 5d d8 c7 1f c9 e0 57 20 0b e2 3f 8b 85 6a 21 4c b1 5a ba f9 66 ff a5 e8 34 79 60 4b 15 68 24 f9 0f c2 d5 08 d1 4a 5f ec 7c 41 53 71 09 89 cf 5a 20 6e bd c6 a3 25 49 7a 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 6b 60 cb 5b 82 ce 90 b1 cc 2b 6c 55 6c 6c 6c 6c

// 00 00 00 5c 9f ec 00 00 00 00 44 23 ca 00 cc 8e 19 20 bb 21 9a 47 6a 5b 15 a0 02 67 e3 38 00 cf e4 f1 5c 71 9e b6 ff d0 1c 90 0a d9 8c 6c 44 19 c4 e0 85 f3 0e 65 60 72 e2 23 2e 9e b8 3f cb 64 85 15 d3 12 72 f8 f3 29 3a f8 42 2b 5b 7a f9 83 1c 7d 41 85 db 3b 06 6b 04 04 19 a6 24 ac 4f b7 5b 94 5c 55 d1 d5 f0 2d 74 b0 19 4b 7d 16 77 80 04 be cc aa ec a5 35 a7 33 90 c5 8f fb 71 eb f5 ca 3d ae 3c dc 12 7c 63 f2 b1 4e c1 d7 f8 34 c1 d7 f8 34 c1 d7 f8 34 c1 d7 f8 34 47 58 0f d4 2c c8 c5 f1 b7 19 ad c0 8b f2 41 6d e8 9e 2d 01 e8 9e 2d 01 e8 9e 2d 01 e8 9e 2d 01 e8 9e 2d

//class XOR {
//    constructor(key) {
//        //this.key = key;
//        this.key = new Int32Array(new ArrayBuffer(4));
//        this.key[0] = key;
//    }
//
//    encrypt2(data) {
//        for (let i = 6; i < data.byteLength - 4; i += 4) {
//            let next = data.readInt32LE(i);
//            this.key[0] += next;
//            next ^= this.key[0];
//            data.writeInt32LE(next, i);
//        }
//        //data.writeInt32LE(this.key[0], 170);
//        //console.log('0x%s', invoke('Utils').toHex(this.key, 8));
//        return data;
//    }
//
//    encrypt(data) {
//        const stop = data.byteLength - 4;
//        let pos = 6;
//
//        while (pos < stop) {
//            let edx = data[pos] & 0xff;
//            edx |= (data[pos + 1] & 0xff) << 8;
//            edx |= (data[pos + 2] & 0xff) << 16;
//            edx |= (data[pos + 3] & 0xff) << 24;
//            this.key[0] += edx;
//            edx ^= this.key[0];
//            data[pos++] = edx & 0xff;
//            data[pos++] = (edx >>> 8) & 0xff;
//            data[pos++] = (edx >>> 16) & 0xff;
//            data[pos++] = (edx >>> 24) & 0xff;
//        }
//
//        //data[pos++] = this.key[0] & 0xff;
//        //data[pos++] = (this.key[0] >>> 8) & 0xff;
//        //data[pos++] = (this.key[0] >>> 16) & 0xff;
//        //data[pos] = (this.key[0] >>> 24) & 0xff;
//
//        return data;
//    }
//}

//let xor = new XOR(0);
//
//let tr = Buffer.from([0x00,0x00,0x00,0x5c,0x9f,0xec,0x44,0x21,0xc6,0x00,0x00,0x51,0x33,0x1f,0x55,0x6e,0x90,0x98,0xd1,0x78,0x89,0xe7,0x94,0x81,0x49,0x47,0x02,0xd6,0xc7,0xe9,0xbc,0x1f,0x61,0x98,0x51,0x5e,0x8d,0x26,0xf9,0xf9,0x67,0xc4,0x36,0xde,0x48,0x0c,0x3f,0x89,0x31,0xc2,0xe5,0xbd,0xac,0xbb,0x86,0x1b,0xa5,0x36,0xe5,0xfa,0x3d,0xd5,0x04,0x89,0xa8,0x7d,0xa2,0xfa,0xab,0x4f,0xcd,0xf0,0x70,0xa2,0x3b,0xa9,0xa8,0x90,0xc6,0xf8,0x37,0x49,0xbb,0x5d,0xd8,0xc7,0x1f,0xc9,0xe0,0x57,0x20,0x0b,0xe2,0x3f,0x8b,0x85,0x6a,0x21,0x4c,0xb1,0x5a,0xba,0xf9,0x66,0xff,0xa5,0xe8,0x34,0x79,0x60,0x4b,0x15,0x68,0x24,0xf9,0x0f,0xc2,0xd5,0x08,0xd1,0x4a,0x5f,0xec,0x7c,0x41,0x53,0x71,0x09,0x89,0xcf,0x5a,0x20,0x6e,0xbd,0xc6,0xa3,0x25,0x49,0x7a,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x6b,0x60,0xcb,0x5b,0x82,0xce,0x90,0xb1,0xcc,0x2b,0x6c,0x55,0x6c,0x6c,0x6c,0x6c,0x00,0x00,0x00,0x00]);
//
//let after = xor.encrypt(tr);
//invoke('Utils').dumpBuffer(after);

// 00 00 00 5c 9f ec 00 00 00 00 44 23 ca 00 cc 8e 19 20 bb 21 9a 47 6a 5b 15 a0 02 67 e3 38 00 cf e4 f1 5c 71 9e b6 ff d0 1c 90 0a d9 8c 6c 44 19 c4 e0 85 f3 0e 65 60 72 e2 23 2e 9e b8 3f cb 64 85 15 d3 12 72 f8 f3 29 3a f8 42 2b 5b 7a f9 83 1c 7d 41 85 db 3b 06 6b 04 04 19 a6 24 ac 4f b7 5b 94 5c 55 d1 d5 f0 2d 74 b0 19 4b 7d 16 77 80 04 be cc aa ec a5 35 a7 33 90 c5 8f fb 71 eb f5 ca 3d ae 3c dc 12 7c 63 f2 b1 4e c1 d7 f8 34 c1 d7 f8 34 c1 d7 f8 34 c1 d7 f8 34 47 58 0f d4 2c c8 c5 f1 b7 19 ad c0 8b f2 41 6d e8 9e 2d 01 e8 9e 2d 01 e8 9e 2d 01 e8 9e 2d 01 e8 9e 2d

// 00 00 00 5c 9f ec 00 00 00 00 44 23 ca 00 cc 8e 19 20 bb 21 9a 47 6a 5b 15 a0 02 67 e3 38 00 cf e4 f1 5c 71 9e b6 ff d0 1c 90 0a d9 8c 6c 44 19 c4 e0 85 f3 0e 65 60 72 e2 23 2e 9e b8 3f cb 64 85 15 d3 12 72 f8 f3 29 3a f8 42 2b 5b 7a f9 83 1c 7d 41 85 db 3b 06 6b 04 04 19 a6 24 ac 4f b7 5b 94 5c 55 d1 d5 f0 2d 74 b0 19 4b 7d 16 77 80 04 be cc aa ec a5 35 a7 33 90 c5 8f fb 71 eb f5 ca 3d ae 3c dc 12 7c 63 f2 b1 4e c1 d7 f8 34 c1 d7 f8 34 c1 d7 f8 34 c1 d7 f8 34 47 58 0f d4 2c c8 c5 f1 b7 19 ad c0 8b f2 41 6d e8 9e 2d 00
