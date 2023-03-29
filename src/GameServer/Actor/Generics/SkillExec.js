const World = invoke('GameServer/World/World');

function skillExec(session, actor, data) {
    World.fetchNpc(data.id).then((npc) => {
        const skill = actor.skillset.fetchSkill(data.selfId);
        actor.automation.scheduleAction(session, actor, npc, skill.fetchDistance(), () => {
            if (npc.fetchAttackable() || data.ctrl) { // TODO: Else, find which `response` fails the attack
                actor.attack.remoteHit(session, npc, skill);
            }
        });
    }).catch((err) => {
        utils.infoWarn('GameServer', 'Skill -> ' + err);
    });
}

module.exports = skillExec;
