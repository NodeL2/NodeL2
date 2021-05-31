module.exports = {
       changeMoveType: invoke('GameServer/Response/ChangeMoveType'),
       changeWaitType: invoke('GameServer/Response/ChangeWaitType'),
    charCreateSuccess: invoke('GameServer/Response/CharCreateSuccess'),
         charSelected: invoke('GameServer/Response/CharSelected'),
       charSelectInfo: invoke('GameServer/Response/CharSelectInfo'),
        charTemplates: invoke('GameServer/Response/CharTemplates'),
            cryptInit: invoke('GameServer/Response/CryptInit'),
            inventory: invoke('GameServer/Response/Inventory'),
             logoutOk: invoke('GameServer/Response/LogoutOk'),
       moveToLocation: invoke('GameServer/Response/MoveToLocation'),
            questList: invoke('GameServer/Response/QuestList'),
              sunrise: invoke('GameServer/Response/Sunrise'),
             userInfo: invoke('GameServer/Response/UserInfo')
};
