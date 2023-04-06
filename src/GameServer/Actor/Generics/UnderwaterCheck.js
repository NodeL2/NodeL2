const ServerResponse = invoke('GameServer/Network/Response');

function underwaterCheck(session, actor) {
    let mapX = ((actor.fetchLocX() - ((11 - 20) * 32768)) >> 15) + 11;
    let mapY = ((actor.fetchLocY() - ((10 - 18) * 32768)) >> 15) + 10;

    if (actor.fetchLocZ() < -3790) {
        if ((mapX === 17 && mapY === 21) || // Northeast Of Orc Barracks
            (mapX === 18 && mapY === 19) || // School Of Dark Arts
            (mapX === 18 && mapY === 23) || // Forgotten Temple
            (mapX === 19 && mapY === 22) || // Ruins Of Despair
            (mapX === 19 && mapY === 23) || // Ruins Of Despair towards Northern Ant Nest
            (mapX === 19 && mapY === 24) || // Southern Ant Nest
            (mapX === 20 && mapY === 18) || // Dark Elven Area
            (mapX === 20 && mapY === 20) || // Elven Fortress
            (mapX === 20 && mapY === 21) || // Cruma Tower
            (mapX === 21 && mapY === 18) || // Sea Of Spores
            (mapX === 21 && mapY === 22) || // Execution Ground
            (mapX === 21 && mapY === 25) || // Elven Ruins
            (mapX === 22 && mapY === 18) || // IVT
            (mapX === 22 && mapY === 21) || // Entrance to DV from Death Pass
            (mapX === 23 && mapY === 17) || // Border Outpost (West)
            (mapX === 23 && mapY === 19) || // Enchanted V.
            (mapX === 23 && mapY === 20) || // Below Hunter's V.
            (mapX === 23 && mapY === 21) || // Deep inside DV
            (mapX === 24 && mapY === 17) || // Blazin Swamp
            (mapX === 24 && mapY === 21) || // Deep inside Anthara's Lair
            (mapX === 25 && mapY === 21) || // Anthara's Nest
            (mapX === 25 && mapY === 12) || // Mithril Mines
            (mapX === 25 && mapY === 19)) { // The Giant's Cave
                actor.stateWater = false;
                session.dataSend(ServerResponse.skillDurationBar(0, 2));
                return;
        }

        let current = actor.fetchLocZ() + 3790;
        console.info(mapX + ' ' + mapY + ' ' + current + ' ' + (current < 0 ? 'Underwater?' : ''));

        if (actor.stateWater === true) {
            return;
        }

        actor.stateWater = true;
        session.dataSend(ServerResponse.skillDurationBar(86000, 2));
    }
    else {
        actor.stateWater = false;
        session.dataSend(ServerResponse.skillDurationBar(0, 2));
    }
}

module.exports = underwaterCheck;
