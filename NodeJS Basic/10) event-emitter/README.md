## 🔔 Node.js Events & EventEmitter

Node.js has a built-in module called `events` that allows us to **create**, **emit**, and **listen to custom events**.

This is useful for handling asynchronous tasks, like user actions, file operations, network requests, etc.

---

## 📦 Importing the Events Module

```js
const EventEmitter = require('node:events');
```

🛠 Creating a Custom EventEmitter Class
We can extend the EventEmitter class to create our own custom emitter:

```js
class MyCustomEmitter extends EventEmitter {
    constructor() {
        super();
        this.greet = 'Hello';
    }

    greet(name) {
        this.emit('greeting', `${this.greet}, ${name}`);
    }
}
```

emit() is used to trigger (fire) an event.

Any data passed with emit() will be available in the event listener.

🔁 Listening to Events
To listen for a custom event, we use the .on() method:
```js
const myCustomEmitter = new MyCustomEmitter();

myCustomEmitter.on('greeting', (input) => {
    console.log("Greeting Event:", input);
});

myCustomEmitter.greet("Waqar");
```

🖨 Output:
Greeting Event: Hello, Waqar

⚠️ What Happens If You Don’t Add a Listener?
If you call .emit() without a corresponding .on() listener, the event will be emitted, but nothing will happen:

```js
// No listener defined
myCustomEmitter.greet("Waqar"); // No output
```
This is expected behavior — events need listeners to produce a visible result.


🧠 Summary
| Concept          | Description                                      |
| ---------------- | ------------------------------------------------ |
| `EventEmitter`   | Built-in class in `events` module                |
| `.emit(event)`   | Triggers/fires an event                          |
| `.on(event, cb)` | Listens to an event and runs callback            |
| Custom class     | Can extend `EventEmitter` to define custom logic |


✅ When to Use EventEmitters?
User-defined actions
System status or custom logs
File read/write notifications
Handling asynchronous workflows

Node.js events are simple yet powerful for building scalable, non-blocking apps! 🚀