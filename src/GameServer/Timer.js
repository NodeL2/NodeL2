const Timer = {
    init(handler, func, ms) {
        if (Timer.exists(handler)) { Timer.clear(handler); }
        handler.timer = setTimeout(func, ms);
    },

    exists(handler) {
        return handler?.timer ? true : false;
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
        clearTimeout(handler.timer);
        delete handler.timer;
    }
};

module.exports = Timer;
