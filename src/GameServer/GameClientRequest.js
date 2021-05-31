module.exports = {
           actionUse: invoke('GameServer/Request/ActionUse'),
      authorizeLogin: invoke('GameServer/Request/AuthorizeLogin'),
          charCreate: invoke('GameServer/Request/CharCreate'),
        charSelected: invoke('GameServer/Request/CharSelected'),
          enterWorld: invoke('GameServer/Request/EnterWorld'),
              logout: invoke('GameServer/Request/Logout'),
      moveToLocation: invoke('GameServer/Request/MoveToLocation'),
        newCharacter: invoke('GameServer/Request/NewCharacter'),
     protocolVersion: invoke('GameServer/Request/ProtocolVersion'),
           questList: invoke('GameServer/Request/QuestList'),
       showInventory: invoke('GameServer/Request/ShowInventory'),
            stopMove: invoke('GameServer/Request/StopMove'),
    validatePosition: invoke('GameServer/Request/ValidatePosition')
};
