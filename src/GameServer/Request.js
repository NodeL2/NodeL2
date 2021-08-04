module.exports = {
        authoriseLogin: invoke('GameServer/Request/AuthoriseLogin'),
    charCreationScreen: invoke('GameServer/Request/CharCreationScreen'),
          charSelected: invoke('GameServer/Request/CharSelected'),
         createNewChar: invoke('GameServer/Request/CreateNewChar'),
             questList: invoke('GameServer/Request/QuestList'),
       protocolVersion: invoke('GameServer/Request/ProtocolVersion')
};
