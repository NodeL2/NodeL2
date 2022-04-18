exports.currentDate = () => {
    return new Date().toISOString().slice(0,10);
};

exports.nodeVersion = () => {
    return process.versions.node;
};

exports.buildNumber = () => {
    return require('../package').version;
};
