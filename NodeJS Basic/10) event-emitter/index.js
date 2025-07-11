const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();

eventEmitter.on('greet', (name) => {
    console.log(`My name is ${name}`)
})

eventEmitter.emit('greet', 'waqar');