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
        const findSkill = (id, success) => {
            const item = DataCache.skills.find((ob) => ob.selfId === id);
            item ? success(item) : utils.infoWarn('GameServer:: unknown skill id %d', id);
        };

        Database.fetchSkills(this.actor.fetchId()).then((skills) => {
            skills.forEach((skill) => {
                findSkill(skill.selfId, (details) => {
                    let level = details.levels[skill.level - 1];
                    delete details.levels;
                    this.skills.push(new SkillModel({ ...utils.crushOb(details), ...level }));
                });
            });
        });
    }
}

module.exports = Skillset;
