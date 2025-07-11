## 📂 File System Module (`fs`) in Node.js

The **`fs` module** in Node.js allows you to **interact with the file system** — creating, reading, updating, deleting files and folders.

To use it, you need to import it:

```js
const fs = require('fs');
const path = require('path');
```

🗂️ Working with Files (Sync and Async)
Node.js supports both synchronous and asynchronous methods for file handling.

📁 Create Folder (Synchronous)
```js
const newFolderPath = path.join(__dirname, 'files');

if (!fs.existsSync(newFolderPath)) {
    fs.mkdirSync(newFolderPath);
    console.log("Folder Created Successfully");
}
```

📝 Write to File (Sync)
```js
const filePath = path.join(newFolderPath, 'name.txt');
fs.writeFileSync(filePath, "waqar");
```

📖 Read File Content (Sync)
```js
const readFileContent = fs.readFileSync(filePath, 'utf-8');
console.log("File Content:", readFileContent);
```

➕ Append to File (Sync)
```js
fs.appendFileSync(filePath, "\nThis is a new name\nAhmed");
const updatedContent = fs.readFileSync(filePath, 'utf-8');
console.log("Updated File Content:", updatedContent);
```

⚙️ Asynchronous File Operations
Asynchronous methods use callbacks and are non-blocking (better for performance in large-scale apps).

✍️ Write, Read, Append (Async)

```js
const asyncFilePath = path.join(newFolderPath, 'async.txt');

fs.writeFile(asyncFilePath, "Hello! from Async file", (err) => {
    if (err) throw err;
    console.log("File Created Successfully");

    fs.readFile(asyncFilePath, 'utf-8', (err, data) => {
        if (err) throw err;
        console.log("Data:", data);
    });

    fs.appendFile(asyncFilePath, "\nnew Line", (err) => {
        if (err) throw err;
        console.log("File Updated Successfully");
    });

    fs.readFile(asyncFilePath, 'utf-8', (err, data) => {
        if (err) throw err;
        console.log("Updated Data:", data);
    });
});
```

🔍 Summary of Common File System Methods

| Method                 | Sync Version          | Async Version     | Description               |
| ---------------------- | --------------------- | ----------------- | ------------------------- |
| Create Folder          | `fs.mkdirSync()`      | `fs.mkdir()`      | Creates a new directory   |
| Check if Folder Exists | `fs.existsSync()`     | -                 | Checks if a path exists   |
| Write File             | `fs.writeFileSync()`  | `fs.writeFile()`  | Writes content to a file  |
| Read File              | `fs.readFileSync()`   | `fs.readFile()`   | Reads content from a file |
| Append to File         | `fs.appendFileSync()` | `fs.appendFile()` | Appends content to a file |


🧠 Tips
Synchronous (Sync) methods block the execution until operation completes — suitable for small scripts or command-line tools.

Asynchronous methods use callbacks and don't block the program — ideal for web apps and servers.


Use the fs module to perform powerful file operations in Node.js, and always prefer async methods for production-grade applications! 🚀
