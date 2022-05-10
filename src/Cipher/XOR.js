let inKey = Buffer.from([0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xc8,0x27,0x93,0x01,0xa1,0x6c,0x31,0x97]);
let enabled = false;

const XOR = {
    encrypt: (data) => {
        let ecx = 0;

        for(let i = 4; i < data.length - 4; i += 4) {
            let edx = data.readInt32LE(i);
            ecx += edx;
            edx ^= ecx;
            data.writeInt32LE(edx, i);
        }

        return data;
    },

    gameDecrypt: (data) => {
        if (!enabled) {
            enabled = true;
            return data;
        }
        let temp = 0;
        for (let i = 0; i < data.length; ++i) {
            const temp2 = data[i] & 0xff;
            data[i] = (temp2 ^ inKey[i & 0xf] ^ temp);
            temp = temp2;
        }
        let old = inKey[8] & 0xff;
        old |= (inKey[9] << 8 & 0xff00);
        old |= (inKey[10] << 16 & 0xff0000);
        old |= (inKey[11] << 24 & 0xff000000);
        old += data.length;
        inKey[8] = (old & 0xff);
        inKey[9] = (old >> 8 & 0xff);
        inKey[10] = (old >> 16 & 0xff);
        inKey[11] = (old >> 24 & 0xff);

        return data;
    }
};

module.exports = XOR;

// Clean
// 00 00 00 77 1d e7 0f 21 c6 00 00 9a 94 c6 2e 59 6a ea 12 e4 0e 89 c2 b0 c4 e9 08 74 1d f2 6e a5 44 6a d9 27 cb 87 bd 87 47 9e 57 05 1a 74 73 1d ec 59 3e 7d ff 35 d8 22 91 1d e5 3b 07 b6 3a 15 22 28 21 c5 23 ba 63 0c 7e c8 ba 84 fc 29 c9 42 66 0a 05 4c 96 4f 7f 71 62 a1 1d 5c 6a 55 d0 d1 bb 14 4e 0f 72 90 df f4 c5 c6 23 6d 03 c0 3b 5a 04 fb a8 1a 40 7b 1d e0 e8 f8 48 f6 92 2f e7 d2 1e 58 d6 8a 51 02 d4 44 5c 16 47 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 6b 60 cb 5b 82 ce 90 b1 cc 2b 6c 55 6c 6c 6c 6c

// XOR
// 00 00 00 77 1d e7 00 00 00 00 0f 21 ce 01 13 4d af 5b 5d 1c dd b3 d3 19 5c cd 11 69 ab e4 e9 67 be ea b9 cd 0e 8f a0 f5 4a 39 23 72 3d 6f 94 89 ff 2c 1b 6f ec 9e 25 16 35 d5 07 4b ac c8 26 93 ef 8e 1c 8e d2 da c3 5b 11 e1 e0 58 97 7a ea 5d b4 57 2d 27 fe e2 d8 ad a8 ef d9 64 5f f1 44 db 4a ac ac 16 11 d9 1e fa ec d6 c7 16 2f 10 24 8c 34 30 6f ea 30 3d f9 30 b1 c7 64 31 7e 41 f4 48 15 9f 3f ae 0c cb 69 2d e5 c9 43 6a b9 df 04 6a b9 df 04 6a b9 df 04 6a b9 df 04 be 79 60 04 d5 26 ab a1 e8 3f c4 30 fc ec 78 bd 90 80 14 d1 90 80 14 d1 90 80 14 d1 90 80 14 d1 90 80 14 00 00 00 00

// Blowfish
// 00 00 91 9e a4 db f7 7a f9 64 48 a3 58 b1 fc 45 64 60 ff 28 ce a5 f5 74 37 dc 00 03 62 a1 a3 24 74 33 37 a2 70 51 7f 97 d9 34 d8 5f 38 cc e1 99 22 00 e2 80 5b 22 d5 9c f9 73 86 74 fc fc d7 40 1b d2 76 52 ba ac 17 f6 a9 5c a9 0e 76 e6 64 7e 0b 8f 51 58 8c ba 5c ff f1 44 43 bf 7b 3f 36 af 76 dd 0d 09 a9 81 9e 93 b6 83 2e 1b 40 29 6e 5f 4c b4 fa 02 24 af 20 6a 09 5d 5e 8e 26 7d 02 4c fa c5 89 12 c8 20 90 c7 c4 07 d3 d4 be 21 5e 98 c4 43 cc 2d f0 51 f0 92 eb 31 38 eb ea c7 6e e5 3f 52 56 af d8 ec fe d0 c5 4a 87 e0 06 28 c7 c5 67 11 f1 31 94 7d 4b 2f 76 3e 20 d7 e6 b4 61 44 f3 66
