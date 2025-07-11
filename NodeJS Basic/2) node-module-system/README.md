## 📦 Node.js Module System

In **Node.js**, the module system is a fundamental part of how code is organized and reused. Node.js supports **two main module systems**:

---

### 🔹 1. CommonJS (CJS) — Default in Node.js

This is the **traditional and widely-used** module system in Node.js.

#### ✅ How to use CommonJS

```js
// math.js — exporting a function
const add = (a, b) => a + b;
module.exports = { add };
```
```js
// app.js — importing the function
const math = require('./math');
console.log(math.add(2, 3)); // Output: 5
```

🔸 Features of CommonJS:
Uses require() to import modules.
Uses module.exports or exports to export code.
Modules are loaded synchronously.
Default in .js files unless specified otherwise.

🔹 2. ECMAScript Modules (ESM) — Modern Standard
This follows the standard ES6 module syntax and is natively supported in recent Node.js versions.

✅ How to use ESM
```js
// math.mjs — exporting
export const add = (a, b) => a + b;
```
```js
// app.mjs — importing
import { add } from './math.mjs';
console.log(add(2, 3)); // Output: 5
```

🔸 Features of ESM:
Uses import and export syntax.
Modules are loaded asynchronously.
Supports top-level await.
🔧 To enable ESM in Node.js:

You have two options:
Rename files to .mjs
Or set this in package.json:
```json
{
  "type": "module"
}
```

| Feature           | CommonJS          | ES Modules (ESM)                       |
| ----------------- | ----------------  | -------------------------------------- |
| File Extension    | `.js`             | `.mjs` or `.js` with `"type":"module"` |
| Import Syntax     | `require()`       | `import`                               |
| Export Syntax     | `module.exports`  | `export`                               |
| Module Loading    | Synchronous       | Asynchronous                           |
| Top-Level `await` | ❌ Not supported  | ✅ Supported                          |


🧠 What Happens Internally in CommonJS?
Node.js wraps every module in a special function like this:

```js
(function(exports, require, module, __filename, __dirname) {
  // your module code
});
```

These special variables are:

exports: Shortcut to module.exports
require: Function to import other modules
module: Metadata about the current module
__filename: Full path to the current file
__dirname: Directory path of the current file

This is why you can use require, __dirname, and __filename directly in Node.js files.