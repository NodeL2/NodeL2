module.exports = {
          init: invoke('AuthServer/Response/Init'),
       loginOk: invoke('AuthServer/Response/LoginOk'),
     loginFail: invoke('AuthServer/Response/LoginFail'),
    serverList: invoke('AuthServer/Response/ServerList'),
        playOk: invoke('AuthServer/Response/PlayOk'),
      playFail: invoke('AuthServer/Response/PlayFail')
};
