# lock-screen

[![NPM](https://nodei.co/npm/lock-screen.png)](https://nodei.co/npm/lock-screen/)

Lock screen will lock the current session.

Currently supports MacOS and Windows. Linux support coming soon.

Uses [ffi-napi](https://npmjs.com/ffi-napi) to make the system calls needed to lock the screen. Has no external dependencies.

## Usage 

```
    const { lockScreen } = require('lock-screen');
    
    lockScreen();
```

## Documentation

Documentation is available in the `docs/` folder or [online here](https://node-lock-screen.docs.zacharyboyd.nyc).

To generate docs run `npm run docs`.