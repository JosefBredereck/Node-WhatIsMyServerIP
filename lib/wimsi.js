"use strict";

const os = require('os');
const ifaces = os.networkInterfaces();
const colors = require('colors/safe');

const wimsi = (port, options = {}) => {
    let serverIP;

    if (!options.message) {
        options.message = `Server runs on LOCAL: {localIP} and NETWORK: {networkIP}`
    }

    if (options.verbose !== false) {
        options.verbose = true;
    }

    Object.keys(ifaces).forEach((ifaceName) => {
        let alias = 0;

        ifaces[ifaceName].forEach((iface) => {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // Skip 127.0.0.1 and non-ipv4 adresses 
                return;
            }

            if (alias >= 1) {
                console.log(ifaceName + ':' + alias, iface.address);
                serverIP = iface.address;
            } else {
                serverIP = iface.address;
            }
            alias++;
        });
    });

    console.log(
        options.message
        .replace('{localIP}', `${colors.green('127.0.0.1')}:${colors.yellow(port)}`)
        .replace('{networkIP}', `${colors.magenta(serverIP)}:${colors.yellow(port)}`)
    );

    return {
        local: {
            ip: '127.0.0.1',
            port: port
        },
        network: {
            ip: serverIP,
            port: port
        }
    }
}

module.exports = wimsi;