# tiny-ee
The smallest event emitter for Node.js

## Install

`npm install tiny-ee`

## Use

```js
var ee = require('tiny-ee')();

ee.on('itworks', function(data) {
  console.log(data);
});

ee.emit('itworks', 'yep');
```

## License
MIT
