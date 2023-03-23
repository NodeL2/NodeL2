const Timer = {
    init() {
        return {};
    },

    start(handler, func, ms) {
        if (Timer.exists(handler)) { Timer.clear(handler); }
        handler.timer = setTimeout(func, ms);
        handler.end   = handler.timer._idleTimeout / 1000;
    },

    exists(handler) {
        return handler?.timer ? true : false;
    },

    completeness(handler) {
        return Timer.elapsed(handler) / handler.end;
    },

    elapsed(handler) {
        if (!(handler?.timer)) return -1;
        return process.uptime() - handler.timer._idleStart / 1000;
    },

    left(handler) {
        if (!(handler?.timer)) return -1;
        return (handler.timer._idleStart + handler.timer._idleTimeout) / 1000 - process.uptime();
    },

    clear(handler) {
        if (!(handler?.timer)) return;
        clearTimeout(handler.timer);
        delete handler.timer;
        delete handler.end;
    }
};

module.exports = Timer;
