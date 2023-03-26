const SkillModel = invoke('GameServer/Model/Skill');
const DataCache  = invoke('GameServer/DataCache');
const Database   = invoke('Database');

class Skillset {
    constructor() {
        this.skills = [];
    }

    fetchSkills() {
        return this.skills;
    }

    fetchSkill(selfId) {
        return this.skills.find((ob) => ob.fetchSelfId() === selfId);
    }

    populate(actor) {
        const skillLevelLookup = (skill, level, success) => {
            const item = skill.levels?.find((ob) => ob.level === level);
            item ? success(item) : utils.infoWarn('GameServer :: unknown Skill Id %d with Level %d', skill.selfId, level);
        };

        Database.fetchSkills(actor.fetchId()).then((ownedSkills) => {
            ownedSkills.forEach((ownedSkill) => {
                DataCache.fetchSkillFromSelfId(ownedSkill.selfId, (skill) => {
                    skillLevelLookup(skill, ownedSkill.level, (level) => {
                        delete skill.levels; this.skills.push(new SkillModel({
                            ...utils.crushOb(skill), ...level
                        }));
                    });
                });
            });
        });
    }

    awardSkills(id, classId, level) {
        DataCache.fetchSkillTreeFromClassId(classId, (skillTree) => {
            const skills = skillTree.skills;
            const levelX = skills?.filter((ob) => ob.levels.find((ob) => ob.pLevel <= level)) ?? [];

            levelX.forEach((skill) => {
                skill.level = skill.levels.filter((ob) => ob.pLevel <= level).pop();
                Database.fetchSkill(id, skill.selfId).then((rows) => {
                    const storedLevel = rows[0]?.level;

                    if (storedLevel) {
                        Database.updateSkillLevel(id, skill.selfId, skill.level.level);
                    }
                    else {
                        DataCache.fetchSkillFromSelfId(skill.selfId, (skillDetails) => {
                            skill = { ...utils.crushOb(skill), passive: skillDetails.template?.passive ?? false };
                            Database.setSkill(skill, id);
                        });
                    }
                });
            });
        });
    }
}

module.exports = Skillset;
