module.exports = {
            init: invoke('AuthServer/Response/Init'),
        gameFail: invoke('AuthServer/Response/GameFail'),
     gameSuccess: invoke('AuthServer/Response/GameSuccess'),
       loginFail: invoke('AuthServer/Response/LoginFail'),
    loginSuccess: invoke('AuthServer/Response/LoginSuccess'),
      serverList: invoke('AuthServer/Response/ServerList')
};