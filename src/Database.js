const SQL = require('like-sql'), builder = new SQL();

let conn;

const Database = {
    init: (callback) => {
        const optn = options.default.Database;

        require('mariadb').createConnection({
            host     : optn.hostname,
            port     : optn.port,
            user     : optn.user,
            password : optn.password,
            database : optn.databaseName

        }).then((instance) => {
            utils.infoSuccess('DB', 'connected');
            conn = instance;
            callback();

        }).catch(error => {
            utils.infoFail('DB', 'failed(%d) -> %s', error.errno, error.text);
        });
    },

    execute: (sql) => {
        return conn.query(sql[0], sql[1]);
    },

    // Creates a `New Account` in the database with provided credentials
    createAccount: (username, password) => {
        return Database.execute(
            builder.insert('accounts', {
                username: username,
                password: password
            })
        );
    },

    // Returns the `Password` from a provided account
    fetchUserPassword: (username) => {
        return Database.execute(
            builder.selectOne('accounts', ['password'], 'username = ?', username)
        );
    },

    // Returns the `Characters` stored on a user's account
    fetchCharacters: (username) => {
        return Database.execute(
            builder.select('characters', ['*'], 'username = ?', username)
        );
    },

    // Checks if acharacter `Name` exists
    fetchCharacterName: (name) => {
        return Database.execute(
            builder.selectOne('characters', ['*'], 'name = ?', name)
        );
    },

    // Stores a new `Character` in database with provided details
    createCharacter(username, data) {
        return Database.execute(
            builder.insert('characters', {
                 username: username,
                     name: data.name,
                     race: data.race,
                  classId: data.classId,
                    maxHp: data.maxHp,
                    maxMp: data.maxMp,
                      sex: data.sex,
                     face: data.face,
                     hair: data.hair,
                hairColor: data.hairColor,
                     locX: data.locX,
                     locY: data.locY,
                     locZ: data.locZ,
            })
        );
    },

    deleteCharacter(username, name) {
        return Database.execute(
            builder.delete('characters', 'username = ? AND name = ?', username, name)
        );
    },

    fetchSkills(characterId) {
        return Database.execute(
            builder.select('skills', ['*'], 'characterId = ?', characterId)
        );
    },

    fetchSkill(characterId, skillSelfId) {
        return Database.execute(
            builder.selectOne('skills', ['*'], 'characterId = ? AND selfId = ?', characterId, skillSelfId)
        );
    },

    deleteSkills(characterId) {
        return Database.execute(
            builder.delete('skills', 'characterId = ?', characterId)
        );
    },

    setSkill(skill, characterId) {
        return Database.execute(
            builder.insert('skills', {
                     selfId: skill.selfId,
                       name: skill.name,
                    passive: skill.passive,
                      level: skill.level,
                characterId: characterId,
            })
        );
    },

    updateSkillLevel(characterId, skillSelfId, skillLevel) {
        return Database.execute(
            builder.update('skills', {
                level: skillLevel
            }, 'selfId = ? AND characterId = ?', skillSelfId, characterId)
        );
    },

    setItem(characterId, item) {
        return Database.execute(
            builder.insert('items', {
                     selfId: item.selfId,
                       name: item.name ?? '',
                     amount: item.amount ?? 1,
                   equipped: item.equipped ?? false,
                       slot: item.slot ?? 0,
                characterId: characterId
            })
        );
    },

    fetchItems(characterId) {
        return Database.execute(
            builder.select('items', ['*'], 'characterId = ?', characterId)
        );
    },

    updateItemAmount(characterId, id, amount) {
        return Database.execute(
            builder.update('items', {
                amount: amount
            }, 'id = ? AND characterId = ?', id, characterId)
        );
    },

    updateItemEquipState(characterId, id, equipped, slot) {
        return Database.execute(
            builder.update('items', {
                equipped: equipped,
                    slot: slot
            }, 'id = ? AND characterId = ?', id, characterId)
        );
    },

    deleteItem(characterId, id) {
        return Database.execute(
            builder.delete('items', 'id = ? AND characterId = ?', id, characterId)
        )
    },

    deleteItems(characterId) {
        return Database.execute(
            builder.delete('items', 'characterId = ?', characterId)
        );
    },

    setShortcut(characterId, shortcut) {
        return Database.execute(
            builder.insert('shortcuts', {
                         id: shortcut.id,
                       kind: shortcut.kind,
                       slot: shortcut.slot,
                    unknown: shortcut.unknown,
                characterId: characterId
            })
        );
    },

    fetchShortcuts(characterId) {
        return Database.execute(
            builder.select('shortcuts', ['*'], 'characterId = ?', characterId)
        );
    },

    deleteShortcut(characterId, slot) {
        return Database.execute(
            builder.delete('shortcuts', 'slot = ? AND characterId = ?', slot, characterId)
        )
    },

    deleteShortcuts(characterId) {
        return Database.execute(
            builder.delete('shortcuts', 'characterId = ?', characterId)
        );
    },

    updateCharacterLocation(id, coords) {
        return Database.execute(
            builder.update('characters', {
                locX: coords.locX,
                locY: coords.locY,
                locZ: coords.locZ,
                head: coords.head ?? -1,
            }, 'id = ? LIMIT 1', id)
        );
    },

    updateCharacterExperience(id, level, exp, sp) {
        return Database.execute(
            builder.update('characters', {
                level: level,
                  exp: exp,
                   sp: sp
            }, 'id = ? LIMIT 1', id)
        );
    },

    updateCharacterVitals(id, hp, maxHp, mp, maxMp) {
        return Database.execute(
            builder.update('characters', {
                   hp: hp,
                maxHp: maxHp,
                   mp: mp,
                maxMp: maxMp,
            }, 'id = ? LIMIT 1', id)
        );
    }
};

module.exports = Database;
