const version = Number((process.versions.node.split('.'))[0]);
const script  = 'node ' + (version >= 17 ? '--openssl-legacy-provider' : '') + ' src/NodeL2';

require('child_process').exec(script, (error, stdout) => {
    console.info(stdout);
});
