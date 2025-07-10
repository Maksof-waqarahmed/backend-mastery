## 📁 Path Module in Node.js

The **`path` module** in Node.js provides **utilities for working with file and directory paths** in a consistent way across different operating systems (Windows, Linux, macOS).

To use it, you must first import it:

```js
const path = require('path');

🧪 Common path Methods
Let’s explore the most commonly used methods with practical examples:

🔹 path.dirname(__filename)
📌 Returns the directory name of the current file.

console.log("Directory Name:", path.dirname(__filename));
✅ Output:
/Users/rana/projects/my-app

🔹 path.basename(__filename)
📌 Returns the file name (with extension) from the full path.
console.log("File Name:", path.basename(__filename));
✅ Output:
index.js

🔹 path.extname(__filename)
📌 Returns the file extension (e.g. .js, .html).
console.log("File Extension:", path.extname(__filename));
✅ Output:
.js

🔹 path.resolve(...paths)
📌 Resolves a sequence of paths into an absolute path.
console.log("Resolve Path:", path.resolve('user', 'documents', 'a'));
✅ Output:
/current/working/directory/user/documents/a
It always starts from the current working directory.

🔹 path.normalize(path)
📌 Normalizes a given path by resolving .., ., and redundant slashes.
console.log("Normalize Path:", path.normalize('/user/.document/..../a/', './../', '/waqar'));
✅ Output:
/waqar

🔹 path.join(...paths)
📌 Joins all given path segments into a single path.
const p = 'abc';
const joinPath = path.join('/user', 'document', 'script', p);
console.log("Join Path:", joinPath);
✅ Output:
/user/document/script/abc
Unlike resolve, join does not return an absolute path by default.

🧠 Why use the path module?
Using string concatenation like '/user' + '/' + 'file.txt' is not safe across different OSes. The path module handles platform-specific path delimiters (/ vs \) automatically.

✅ Summary of Methods

| Method        | Description                    |
| ------------- | ------------------------------ |
| `dirname()`   | Directory of the file          |
| `basename()`  | File name from path            |
| `extname()`   | Extension of the file          |
| `resolve()`   | Absolute path from segments    |
| `normalize()` | Clean and standardize the path |
| `join()`      | Combine path segments into one |

Use the path module whenever you're dealing with file system paths to ensure cross-platform compatibility. 🚀