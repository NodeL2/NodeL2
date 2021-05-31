module.exports = {
          actionUse: invoke('GameServer/Request/actionUse'),
     authorizeLogin: invoke('GameServer/Request/authorizeLogin'),
         charCreate: invoke('GameServer/Request/charCreate'),
       charSelected: invoke('GameServer/Request/charSelected'),
         enterWorld: invoke('GameServer/Request/enterWorld'),
             logout: invoke('GameServer/Request/logout'),
     moveToLocation: invoke('GameServer/Request/moveToLocation'),
       newCharacter: invoke('GameServer/Request/newCharacter'),
    protocolVersion: invoke('GameServer/Request/protocolVersion'),
          questList: invoke('GameServer/Request/questList'),
      showInventory: invoke('GameServer/Request/showInventory')
};
