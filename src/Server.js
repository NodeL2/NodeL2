global.invoke = (module) => {
    return require(__dirname + '/' + module);
};

let AuthServer = invoke('AuthServer/AuthServer');

invoke('Database').initDatabase(() => {
    new AuthServer();
});
