## 🌟 Promises in JavaScript & Node.js

**Promises** are a way to handle **asynchronous operations** in JavaScript, especially in Node.js. They make your code **cleaner**, **easier to read**, and avoid messy nested callbacks (callback hell).

---

## 📌 What is a Promise?

A **Promise** represents a value that may be available now, later, or never.

It has 3 possible states:

| State       | Description                                |
|-------------|--------------------------------------------|
| `pending`   | The initial state — operation is not done  |
| `fulfilled` | The operation completed successfully        |
| `rejected`  | The operation failed                        |

---

## ✅ Creating a Promise

```js
const myPromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("✅ Promise Resolved!");
  } else {
    reject("❌ Promise Rejected!");
  }
});
```

📥 Consuming a Promise

```js
myPromise
  .then((result) => {
    console.log(result); // ✅ Runs if resolved
  })
  .catch((error) => {
    console.error(error); // ❌ Runs if rejected
  })
  .finally(() => {
    console.log("🎯 Promise completed"); // Runs always
  });
```
🕒 Promise Example with setTimeout
```js
function delayFun(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

console.log("⏳ Promise Started");

delayFun(2000).then(() => {
  console.log("✅ Promise resolved after 2 seconds");
});

console.log("📘 End of Code");
```

🧠 When to Use Promises?
When you are doing asynchronous operations like:

Reading files
Fetching data from APIs
Accessing databases
When you want clean, readable, and maintainable code
To avoid callback hell

🧪 Chaining Promises
```js
function step1() {
  return Promise.resolve("Step 1 done");
}
function step2() {
  return Promise.resolve("Step 2 done");
}

step1()
  .then((res1) => {
    console.log(res1);
    return step2();
  })
  .then((res2) => {
    console.log(res2);
  });
```

🔄 Summary

| Concept       | Description                             |
| ------------- | --------------------------------------- |
| `Promise`     | Represents future value/result          |
| `resolve()`   | Mark promise as fulfilled               |
| `reject()`    | Mark promise as failed                  |
| `.then()`     | Run code on success                     |
| `.catch()`    | Run code on failure                     |
| `.finally()`  | Run code after success/failure          |
| `async/await` | Cleaner way to write promise-based code |

Promises are a powerful tool in modern JavaScript and essential in Node.js for handling asynchronous code in a reliable, clean, and elegant way! 🚀