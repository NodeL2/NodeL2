module.exports = {
      charSelected: invoke('GameServer/Response/CharSelected'),
    charSelectInfo: invoke('GameServer/Response/CharSelectInfo'),
     charTemplates: invoke('GameServer/Response/CharTemplates'),
    moveToLocation: invoke('GameServer/Response/MoveToLocation'),
         questList: invoke('GameServer/Response/QuestList'),
     logoutSuccess: invoke('GameServer/Response/LogoutSuccess'),
           restart: invoke('GameServer/Response/Restart'),
           sunrise: invoke('GameServer/Response/Sunrise'),
          userInfo: invoke('GameServer/Response/UserInfo'),
      versionCheck: invoke('GameServer/Response/VersionCheck')
};
