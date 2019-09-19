# Node-WhatsMyServerIP

Searches and shows you server/local ip of your client.

### Usage

In you server.js file require whatismyserverip.

```javascript
var wimsi = require('whatismyserverip');

//[...]

// Last row of server file
// wimsi(port, options)
wimsi(3000, {});
```

The wimsi function will return an object if you want to use it for further actions.

```javascript
{
    local: {
        ip: '127.0.0.1',
        port: 3000
    },
    network: {
        ip: '10.0.0.1',
        port: 3000
    }
}
```

#### Options (optional)

As a current option you can configre the output message for the console log or disable the log.

```javascript
// defaults
options {
    verbose: true,
    message: `Server runs on LOCAL: {localIP} and NETWORK: {networkIP}`
}
```

The string placeholder {localIP} and {networkIP} will be replaced with the local and network ip.
