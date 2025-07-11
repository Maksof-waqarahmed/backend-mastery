## 🔁 Callbacks and Callback Hell in Node.js

In Node.js, many operations like reading files, accessing APIs, or databases are **asynchronous** — they don't run top-to-bottom like regular code.

To **handle the result** of an async task (when it finishes), we use **callbacks**.

---

### 📌 What is a Callback?

A **callback** is a function passed as an argument to another function, which will be called **after the operation completes**.

### ✅ Simple Callback Example

```js
function greet(name, callback) {
  console.log("Hello " + name);
  callback();
}

function sayBye() {
  console.log("Goodbye!");
}

greet("Waqar", sayBye);
```

⚙️ Real-world Callback Example (Async)

```js
const fs = require('fs');

fs.readFile('file.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log("Error reading file");
  } else {
    console.log("File content:", data);
  }
});
```
Here, the callback function is executed after readFile finishes reading the file.

🚨 What is Callback Hell?
Callback Hell happens when you have too many nested callbacks, making code:

Hard to read
Hard to debug
Hard to maintain

😵 Example of Callback Hell

```js
fs.readFile('file1.txt', 'utf-8', (err, data1) => {
  fs.readFile('file2.txt', 'utf-8', (err, data2) => {
    fs.writeFile('output.txt', data1 + data2, (err) => {
      console.log("Files combined and written successfully!");
    });
  });
});
```
🔻 Problem:
Hard to trace errors
Each level goes deeper → like a "pyramid of doom"

🛠 Solutions to Avoid Callback Hell

| Technique         | Description                                |
| ----------------- | ------------------------------------------ |
| ✅ Named functions | Move callbacks to separate named functions |
| ✅ Promises        | A cleaner way to chain async tasks         |
| ✅ Async/Await     | Modern syntax that looks like regular code |


Using callbacks is the foundation of async programming in Node.js, but to keep your code clean and scalable — move toward Promises or Async/Await! 🚀