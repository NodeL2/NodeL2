module.exports = {
              action: invoke('GameServer/Request/Action'),
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
                 say: invoke('GameServer/Request/Say'),
       showInventory: invoke('GameServer/Request/ShowInventory'),
        socialAction: invoke('GameServer/Request/SocialAction'),
            stopMove: invoke('GameServer/Request/StopMove'),
        targetCancel: invoke('GameServer/Request/TargetCancel'),
    validatePosition: invoke('GameServer/Request/ValidatePosition')
};
