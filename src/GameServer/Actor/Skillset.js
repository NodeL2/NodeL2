const SkillModel = invoke('GameServer/Model/Skill');
const DataCache  = invoke('GameServer/DataCache');
const Database   = invoke('Database');

class Skillset {
    constructor() {
        this.resetSkills();
    }

    resetSkills() {
        this.skills = [];
    }

    fetchSkills() {
        return this.skills;
    }

    fetchSkill(selfId) {
        return this.skills.find((ob) => ob.fetchSelfId() === selfId);
    }

    populate(characterId, callback = () => {}) {
        // Start anew
        this.resetSkills();

        const skillLevelLookup = (skill, level, success) => {
            const item = skill.levels?.find((ob) => ob.level === level);
            item ? success(item) : utils.infoWarn('GameServer', 'unknown Skill Id %d with Level %d', skill.selfId, level);
        };

        Database.fetchSkills(characterId).then((ownedSkills) => {
            ownedSkills.forEach((ownedSkill) => {
                DataCache.fetchSkillFromSelfId(ownedSkill.selfId, (skill) => {
                    skillLevelLookup(skill, ownedSkill.level, (level) => {
                        delete skill.levels; this.skills.push(new SkillModel({
                            ...utils.crushOb(skill), ...level
                        }));
                    });
                });
            });

            callback();
        });
    }

    awardSkills(id, classId, level) {
        return new Promise((success) => {
            const createOrUpdateSkill = (skill) => {
                return new Promise((done) => {
                    skill.levels = skill.levels.filter((ob) => ob.pLevel <= level).pop();

                    Database.fetchSkill(id, skill.selfId).then((ownedSkill) => {
                        const storedLevel = ownedSkill[0]?.level;

                        // The skill is present in DB, update its level
                        if (storedLevel) {
                            Database.updateSkillLevel(id, skill.selfId, skill.levels.level).then(() => {
                                done();
                            });
                        }
                        else {
                            // The skill is a new addition based on character's level
                            DataCache.fetchSkillFromSelfId(skill.selfId, (skillDetails) => {
                                skill = { ...utils.crushOb(skill), passive: skillDetails.template?.passive ?? false };
                                Database.setSkill(skill, id).then(() => {
                                    done();
                                });
                            });
                        }
                    });
                });
            };

            DataCache.fetchSkillTreeFromClassId(classId, (skillTree) => {
                const skills = skillTree.skills;
                const levelX = skills?.filter((ob) => ob.levels.find((ob) => ob.pLevel <= level)) ?? [];

                // Loop on skills that match character's current level
                levelX.reduce((previous, skill) => {
                    return previous.then(() => {
                        return createOrUpdateSkill(skill);
                    });
                }, Promise.resolve()).then(() => {
                    // Re-instantiate all character skills
                    this.populate(id, () => {
                        return success();
                    });
                });
            });
        });
    }
}

module.exports = Skillset;
