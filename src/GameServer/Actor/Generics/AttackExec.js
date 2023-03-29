const World = invoke('GameServer/World/World');

function attackExec(session, actor, data) {
    World.fetchNpc(data.id).then((npc) => {
        actor.automation.scheduleAction(session, actor, npc, 0, () => {
            if (npc.fetchAttackable() || data.ctrl) {
                actor.attack.meleeHit(session, npc);
            }
            else {
                World.npcTalk(session, npc);
            }
        });
    }).catch((err) => {
        utils.infoWarn('GameServer', 'Attack -> ' + err);
    });
}

module.exports = attackExec;
