module.exports = {
                  attack: invoke('GameServer/Response/Attack'),
         autoAttackStart: invoke('GameServer/Response/AutoAttackStart'),
          changeMoveType: invoke('GameServer/Response/ChangeMoveType'),
          changeWaitType: invoke('GameServer/Response/ChangeWaitType'),
       charCreateSuccess: invoke('GameServer/Response/CharCreateSuccess'),
            charSelected: invoke('GameServer/Response/CharSelected'),
          charSelectInfo: invoke('GameServer/Response/CharSelectInfo'),
           charTemplates: invoke('GameServer/Response/CharTemplates'),
               createSay: invoke('GameServer/Response/CreateSay'),
               cryptInit: invoke('GameServer/Response/CryptInit'),
               inventory: invoke('GameServer/Response/Inventory'),
                logoutOk: invoke('GameServer/Response/LogoutOk'),
          moveToLocation: invoke('GameServer/Response/MoveToLocation'),
                 npcInfo: invoke('GameServer/Response/NpcInfo'),
               questList: invoke('GameServer/Response/QuestList'),
                 showMap: invoke('GameServer/Response/ShowMap'),
            socialAction: invoke('GameServer/Response/SocialAction'),
            statusUpdate: invoke('GameServer/Response/StatusUpdate'),
    stopMoveWithLocation: invoke('GameServer/Response/StopMoveWithLocation'),
                 sunrise: invoke('GameServer/Response/Sunrise'),
          targetSelected: invoke('GameServer/Response/TargetSelected'),
        targetUnselected: invoke('GameServer/Response/TargetUnselected'),
                userInfo: invoke('GameServer/Response/UserInfo')
};
