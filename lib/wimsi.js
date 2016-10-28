(function () {

    "use strict";

    var root = this;

    var os = require('os'),
        ifaces = os.networkInterfaces(),
        colors = require('colors/safe'),
        serverIP;

    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                /* 127.0.0.1 und non-ipv4 Adressen überspringen */
                return;
            }

            if (alias >= 1) {
                console.log(ifname + ':' + alias, iface.address);
                serverIP = iface.address;
            } else {
                serverIP = iface.address;
            }
            ++alias;
        });
    });

    function show(port) {
        console.log('Server runs on: ' + colors.green('http://127.0.0.1') + ":" + colors.yellow(port) + '/ or ' + colors.magenta(serverIP) + ":" + colors.yellow(port) + '/');
    }

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = show;
        }
        exports.show = show;
    } else {
        root.show = show;
    }

}).call(this);
