const Npc       = invoke('GameServer/Npc/Npc');
const DataCache = invoke('GameServer/DataCache');

var app={
    angle: function(a,b,c) { // angle at point b
        var v1=[b[0] - a[0], b[1] - a[1]],
            v2=[b[0] - c[0], b[1] - c[1]];
            
        return Math.acos(this.inner(v1, v2) / (this.norm(v1) * this.norm(v2)));
    },
    is_clockwise: function(a,b,c) {
        return ((b[0]-a[0]) * (c[1]-a[1]) - (c[0]-a[0]) * (b[1]-a[1])) < 0 ? true : false;
    },
    clamp_index: function(x,a,b) {
        x=x < a ? b : x;
        x=x > b ? a : x;
    
        return x;
    },
    norm: function(v) {
        var s=0, n=v.length;

        for(var i=0; i < n; ++i) {
            s += Math.pow(v[i], 2);
        }

        return Math.sqrt(s);
    },
    inner: function(a,b) {
        var s=0;

        for(var i=0; i < a.length; ++i){
            s += (a[i]*b[i]);
        }

        return s;
    },
    triangulate: function(points) {
        var n=points.length, m, angles=[], triangles=[], poly_cw, ear_cw, a, b, c, theta, min_ang, i, max_x;
        
        if(points[0][0] == points[n-1][0] && points[0][1] == points[n-1][1]){
            n=n-1;
        }

        m=n;

        max_x=points[0][0], i;

        for(var k=1; k < n; ++k){
            if(points[k][0] > max_x){
                max_x=points[k][0];
                i=k;
            }
        }

        let h=this.clamp_index(i-1,0,n-1);
        let j=this.clamp_index(i+1,0,n-1);
        
        a=points[h]; b=points[i]; c=points[j];

        poly_cw=this.is_clockwise(a,b,c);

        for(let k=0; k < n; ++k){
            a=points[k];
            b=points[(k+1)%n];
            c=points[(k+2)%n];
    
            theta=this.angle(a,b,c);
            ear_cw=this.is_clockwise(a,b,c);
    
            if(ear_cw != poly_cw){
                theta = 2*Math.PI - theta;
            }
    
            angles[(k+1)%n] = theta;
        }

    
        for(let k=0; k < m-2; ++k){
            min_ang=Math.min(...angles);
    
            i=angles.indexOf(min_ang);
    
            h=this.clamp_index(i-1,0,n-1);
            j=this.clamp_index(i+1,0,n-1);
    
            triangles.push([points[h], points[i], points[j]]);
    
            //==================== UPDATE ANGLE k - 1 ====================
            a=points[this.clamp_index(h-1,0,n-1)]; b=points[h]; c=points[j];
            ear_cw=this.is_clockwise(a,b,c);
            theta = this.angle(a,b,c);
            if(ear_cw != poly_cw) theta=2*Math.PI - theta;
            angles[h] = theta;
            //============================================================
    
    
            //==================== UPDATE ANGLE k + 1 ====================
            a=points[h]; b=points[j]; c=points[this.clamp_index(j+1,0,n-1)];
    
            ear_cw=this.is_clockwise(a,b,c);
    
            theta = this.angle(a,b,c);
    
            if(ear_cw != poly_cw) theta=2*Math.PI - theta;
    
            angles[j] = theta;
            //============================================================
    
    
    
            points.splice(i,1);
            angles.splice(i,1);
    
            n--;
        }
    
        return triangles;
    }
}

function spawnNpcs() {
//    DataCache.npcs.forEach((npc) => {
//        const spawns = DataCache.npcSpawns.filter(ob => ob.selfId === npc.selfId)[0]?.spawns ?? [];
//        spawns.forEach((coords) => {
//            this.npc.spawns.push(
//                new Npc(this.npc.nextId++, utils.crushOb({ ...npc, ...coords }))
//            );
//        });
//    });
//
//    utils.infoSuccess('Spawns', '%d Npcs & Monsters', this.npc.spawns.length);

    DataCache.npcSpawns.forEach((item) => {
        const bounds = item.bounds;
        const spawns = item.spawns;

        spawns.forEach((spawn) => {
            const npc = DataCache.npcs.find((ob) => ob.selfId === spawn.selfId);
            if (npc && spawn.coords[0]) {
                if (spawn.coords[0].head === 0) {
                    spawn.coords[0].head = utils.randomNumber(65536);
                }
                const coords = {
                    locX: spawn.coords[0].locX,
                    locY: spawn.coords[0].locY,
                    locZ: spawn.coords[0].locZ,
                    head: spawn.coords[0].head,
                }
                this.npc.spawns.push(
                    new Npc(this.npc.nextId++, utils.crushOb({ ...npc, ...coords }))
                );
            }
            else if (npc && bounds) {
                let coordinates = [];
                let locZ = 0;
                for (let bound of bounds) {
                    coordinates.push({x:bound.locX, y:bound.locY});
                    locZ = bound.maxZ;
                }

                let divide = (array, size) => {
                    var results = [];
                    while (array.length) {
                      results.push(array.splice(0, size));
                    }
                    return results;
                };

                let triangles;
                try {
                    triangles = require('poly-partition').triangulate(coordinates, true);
                }
                catch (error) {
                    //console.info(error);
                }

                if (triangles === undefined) {
                    console.log(item.selfId);
                    console.log('Yes');
                    return;
                }
                let vertexCnt = 0;

                //function method3(ptX1, ptX2, ptX3) {
                //    let r1 = random();
                //    let r2 = random();
                //    
                //    let s1 = sqrt(r1);
                //    
                //    let x = x1 * (1.0 - s1) + x2 * (1.0 - r2) * s1 + x3 * r2 * s1;
                //    let y = y1 * (1.0 - s1) + y2 * (1.0 - r2) * s1 + y3 * r2 * s1;
                //    
                //    fill(255, 0, 0);
                //    circle(x, y, 1);
                //    
                //    return [x, y];
                //  }

                for (let i = 0; i < spawn.total; i++, vertexCnt++) {
//                    const pos = randomPositionInPolygon(polygon);
//
//                    const coords = {
//                        locX: pos[0],
//                        locY: pos[1],
//                        locZ: locZ,
//                        head: utils.randomNumber(65536),
//                    }
//                    this.npc.spawns.push(
//                        new Npc(this.npc.nextId++, utils.crushOb({ ...npc, ...coords }))
//                    );
                }
            }
        });
    });

    utils.infoSuccess('Spawns', '%d Npcs & Monsters', this.npc.spawns.length);
}

module.exports = spawnNpcs;
