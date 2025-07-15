# 🍃 MongoDB + Mongoose: Basic CRUD with Node.js

This project demonstrates how to **connect MongoDB with Node.js** using **Mongoose**, define schemas, and perform common database operations such as creating, reading, updating, and deleting documents.

---

## 📦 Prerequisites

- Node.js installed
- MongoDB instance (local or cloud via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- `.env` file with the `DB_URL` key
- `mongoose` and `dotenv` packages installed

### Install Packages

```bash
npm install mongoose dotenv
```

⚙️ Setup
1. .env File

```env
DB_URL=mongodb://localhost:27017/mydatabase
# or MongoDB Atlas connection string
```

2. Database Connection (Mongoose)
```js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
```

🧱 Schema Definition
```js
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  tags: [String],
  isActive: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model("User", userSchema);
```

✨ CRUD Operations
🔹 Create
Option 1: Model.create()

```js
await UserModel.create({
  name: "Ahad",
  age: 25,
  email: "ahad@example.com",
  isActive: true,
  tags: ["developer", "blogger"]
});
```

Option 2: .save() with new UserModel()
```js
const newUser = new UserModel({
  name: "Ahmed",
  age: 30,
  email: "ahmed@example.com",
  isActive: false,
  tags: ["engineer"]
});

await newUser.save();
```

🔹 Read (Find)
```js
const allUsers = await UserModel.find(); // All documents
const inactiveUsers = await UserModel.find({ isActive: false }); // Filtered
```
Select specific fields
```js
const selected = await UserModel.find().select('name email -_id');
```
Pagination
```js
const paginated = await UserModel.find().limit(5).skip(10); // 5 users, skip first 10
```
Sorting
```js
const sortedUsers = await UserModel.find().sort({ age: -1 }); // Descending by age
```
Count documents
```js
const totalCount = await UserModel.countDocuments();
const inactiveCount = await UserModel.countDocuments({ isActive: false });
```

🔹 Update  
```js
const updatedUser = await UserModel.findByIdAndUpdate(
  'USER_ID_HERE',
  {
    $set: { age: 100 },
    $push: { tags: 'updated' }
  },
  { new: true } // Return the updated document
);
```
🔹 Delete
```js
const deletedUser = await UserModel.findByIdAndDelete('USER_ID_HERE');
```

🧠 Best Practices
| Practice                                  | Description                                                         |
| ----------------------------------------- | ------------------------------------------------------------------- |
| `.env` File                               | Store database connection string securely                           |
| `try/catch` Blocks                        | Handle database errors properly                                     |
| `finally { mongoose.connection.close() }` | Always close DB connection after operations (in standalone scripts) |
| `Model.find()`                            | Use for reading multiple records                                    |
| `findByIdAndUpdate()`                     | Efficiently update by ID                                            |
| `select()`                                | Optimize query size by selecting only needed fields                 |
| `limit()` + `skip()`                      | Useful for pagination                                               |

🧪 Example: Complete CRUD Flow
```js
async function createUser() {
  try {
    const newUser = await UserModel.create({
      name: "Zeeshan",
      email: "zeeshan@example.com",
      age: 22,
      isActive: true,
      tags: ['dev', 'student']
    });

    console.log("New User:", newUser);

    const users = await UserModel.find();
    console.log("All Users:", users);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.connection.close();
  }
}
createUser();
```

✅ Summary
| Task           | Method Used                        |
| -------------- | ---------------------------------- |
| Connect DB     | `mongoose.connect()`               |
| Define Schema  | `mongoose.Schema()`                |
| Create Record  | `Model.create()`, `.save()`        |
| Read Records   | `Model.find()`, `Model.findById()` |
| Update Record  | `Model.findByIdAndUpdate()`        |
| Delete Record  | `Model.findByIdAndDelete()`        |
| Filters & Sort | `.select()`, `.limit()`, `.sort()` |
| Count Records  | `.countDocuments()`                |


Built with ❤️ using MongoDB, Mongoose, and Node.js