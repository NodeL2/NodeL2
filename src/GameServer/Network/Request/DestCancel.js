function destCancel(session, buffer) {
    invoke('GameServer/Generics').unselect(session, session.actor);
}

module.exports = destCancel;
