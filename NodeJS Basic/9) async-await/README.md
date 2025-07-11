## 🔄 async / await in JavaScript & Node.js

The `async/await` syntax is a **modern and cleaner way** to work with Promises in JavaScript and Node.js.

It makes **asynchronous code look synchronous**, improving **readability** and **error handling**.

---

## 📌 What is `async`?

- `async` is a **keyword** used before a function.
- It **automatically returns a Promise**.
- You can use `await` **inside** an `async` function.

```js
async function greet() {
  return "Hello Waqar!";
}

greet().then(console.log); // Output: Hello Waqar!
```

📌 What is await?
await waits for a Promise to resolve.

It pauses the execution of the async function until the Promise settles.

Only works inside an async function.

✅ Basic Example
```js
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function runTask() {
  console.log("⏳ Waiting...");
  await delay(2000);
  console.log("✅ Done after 2 seconds");
}

runTask();
```

🧠 Real-world Example with fs.promises

```js
const fs = require('fs').promises;

async function readMyFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf-8');
    console.log("File Content:", data);
  } catch (err) {
    console.error("❌ Error reading file:", err);
  }
}

readMyFile();
```
🛠 Error Handling in async/await
Use try...catch blocks to handle errors gracefully:

```js
async function fetchData() {
  try {
    const res = await fetch("https://api.example.com/data");
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}
```

🔁 async/await vs Promises vs Callbacks
| Feature        | Callback             | Promise                 | async/await         |
| -------------- | -------------------- | ----------------------- | ------------------- |
| Syntax         | Nested               | Chained `.then()` calls | Synchronous-looking |
| Error Handling | Hard to manage       | `.catch()`              | `try...catch`       |
| Readability    | Poor (callback hell) | Better                  | ✅ Best              |

📦 Summary
| Concept       | Description                                      |
| ------------- | ------------------------------------------------ |
| `async`       | Makes a function return a Promise                |
| `await`       | Pauses function until Promise resolves           |
| `try...catch` | Clean way to handle errors in async functions    |
| Use Case      | When working with APIs, files, DBs, timers, etc. |

🧪 Final Practical Example
```js
function fakeAPICall() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("📦 API data received!");
    }, 2000);
  });
}

async function showData() {
  console.log("Fetching...");
  const data = await fakeAPICall();
  console.log(data);
}

showData();
```

Using async/await makes your code look synchronous, even though it's still non-blocking and asynchronous under the hood — perfect for writing clean, modern Node.js apps! 🚀