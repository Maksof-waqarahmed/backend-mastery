## 📄 Understanding `package.json` in Node.js

The `package.json` file is the **heart of every Node.js project**. It holds important **metadata** about your project, including:

- Project name, version, and description
- Scripts to automate tasks
- Project dependencies
- Author and license information

---

### 🛠️ Creating a `package.json` File

You can generate it using `npm`:

#### 🔹 Option 1: Manual setup (step-by-step)
```bash
npm init
```

This command will ask you a few questions (like project name, version, entry point, etc.) and create the package.json file.

```bash
npm init -y
```

This auto-generates a package.json file with default values.

📦 Dependencies vs. Dev Dependencies

✅ dependencies
These are the packages your project needs to run in production (e.g., express, mongoose, etc.).

npm install express

➡️ This will add express to the dependencies section in package.json.

🧪 devDependencies
These are used only during development, such as testing libraries, linters, and bundlers (e.g., nodemon, jest, eslint).
```bash
npm install nodemon --save-dev
➡️ This adds nodemon to the devDependencies section.
```

🔧 Common npm Commands
| Task                      | Command                          |
| ------------------------- | -------------------------------- |
| Install a package         | `npm install package_name`       |
| Install multiple packages | `npm install express cors`       |
| Install dev dependency    | `npm install nodemon --save-dev` |
| Uninstall a package       | `npm uninstall package_name`     |
| Update a package          | `npm update package_name`        |

❌ What if you write a wrong package name?
If you type a wrong package name while installing:

npm install expresss

You will get an error like:
npm ERR! 404 Not Found - GET https://registry.npmjs.org/expresss - Not found

This happens because npm checks its official registry (npmjs.com) to find the package. If the package name doesn’t exist in the registry, it throws an error.

📂 Example package.json
```json
{
  "name": "my-node-project",
  "version": "1.0.0",
  "description": "A simple Node.js project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  },
  "author": "Rana",
  "license": "ISC"
}
```
🧠 Remember:
Every time you install a package using npm install, it automatically updates package.json and package-lock.json with exact version info.