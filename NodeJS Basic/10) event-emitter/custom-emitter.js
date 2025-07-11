const EventEmitter = require('node:events');

class MyCustomEmitter extends EventEmitter {
    constructor() {
        super();
        this.greet = 'Hello'
    }

    greet(name) {
        this.emit("greeting", `${this.greet}, ${name}`)
    }
}

const myCustomEmitter = new MyCustomEmitter();

// myCustomEmitter.on('greeting', (input) => {
//     console.log("Greeting Event", input)
// })

myCustomEmitter.greet("Waqar");