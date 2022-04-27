module.exports = {
          authGG: invoke('AuthServer/Response/GGAuth'),
          initLS: invoke('AuthServer/Response/InitLS'),
       loginFail: invoke('AuthServer/Response/LoginFail'),
    loginSuccess: invoke('AuthServer/Response/LoginSuccess')
};
