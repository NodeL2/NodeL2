module.exports = {
        authoriseLogin: invoke('GameServer/Request/AuthoriseLogin'),
    charCreationScreen: invoke('GameServer/Request/CharCreationScreen'),
          charSelected: invoke('GameServer/Request/CharSelected'),
         createNewChar: invoke('GameServer/Request/CreateNewChar'),
            enterWorld: invoke('GameServer/Request/EnterWorld'),
                logout: invoke('GameServer/Request/Logout'),
        moveToLocation: invoke('GameServer/Request/MoveToLocation'),
             questList: invoke('GameServer/Request/QuestList'),
       protocolVersion: invoke('GameServer/Request/ProtocolVersion'),
               restart: invoke('GameServer/Request/Restart'),
      validatePosition: invoke('GameServer/Request/ValidatePosition'),
};
