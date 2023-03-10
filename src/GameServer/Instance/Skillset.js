const SkillModel = invoke('GameServer/Model/Skill');
const DataCache  = invoke('GameServer/DataCache');
const Database   = invoke('Database');

class Skillset {
    constructor(actor) {
        this.actor  = actor;
        this.skills = [];
    }

    fetchSkills() {
        return this.skills;
    }

    fetchSkill(id) {
        return this.skills.find((ob) => ob.fetchSelfId() === id);
    }

    populate() {
        const skillLookup = (skill, success) => {
            const item = { ...DataCache.skills.find((ob) => ob.selfId === skill.selfId) };
            item ? success(item) : utils.infoWarn('GameServer:: unknown Skill Id %d', skill.selfId);
        };

        const skillLevelLookup = (skill, level, success) => {
            const item = skill.levels?.find((ob) => ob.level === level);
            item ? success(item) : utils.infoWarn('GameServer:: unknown Skill Id %d with Level %d', skill.selfId, level);
        };

        Database.fetchSkills(this.actor.fetchId()).then((ownedSkills) => {
            ownedSkills.forEach((ownedSkill) => {
                skillLookup(ownedSkill, (skill) => {
                    skillLevelLookup(skill, ownedSkill.level, (level) => {
                        delete skill.levels; this.skills.push(new SkillModel({ ...utils.crushOb(skill), ...level }));
                    });
                });
            });
        });
    }
}

module.exports = Skillset;
