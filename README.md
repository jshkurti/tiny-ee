# tiny-ee
The smallest event emitter for Node.js

## Install

`npm install tiny-ee`

## Use

```js
var Emitter = require('tiny-ee');
var emitter = new Emitter();

emitter.on('itworks', console.log);

emitter.once('itworks', function() {
  console.log('I will die after this');
});

emitter.emit('itworks', 'yep');


// More methods
emitter.removeListener('itworks', console.log);
emitter.addListener('itworks', console.log);
emitter.removeAllListeners('itworks');
console.log(emitter.listeners('itworks'));

```

## License
MIT
