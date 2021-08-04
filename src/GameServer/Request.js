module.exports = {
        authoriseLogin: invoke('GameServer/Request/AuthoriseLogin'),
    charCreationScreen: invoke('GameServer/Request/CharCreationScreen'),
          charSelected: invoke('GameServer/Request/CharSelected'),
         createNewChar: invoke('GameServer/Request/CreateNewChar'),
       protocolVersion: invoke('GameServer/Request/ProtocolVersion')
};
