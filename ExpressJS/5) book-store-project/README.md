# 📚 Book Store API (CRUD) – Express + MongoDB + Mongoose

A fully functional **CRUD REST API** for managing books using **Express.js**, **MongoDB**, and **Mongoose**. This project demonstrates modular file structuring, reusable helper functions, route handling, schema validation, and error responses.

---

## 📦 Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB (via Mongoose)**
- **dotenv** – for environment variables

---

## 📁 Folder Structure

bookstore-api/
│
├── controller/
│ └── book-controller.js # Logic for CRUD operations
│
├── database/
│ └── db.js # MongoDB connection setup
│
├── helper/
│ └── index.js # Common helpers like sendResponse, isValidId
│
├── models/
│ └── book.js # Book Mongoose schema
│
├── routes/
│ └── book-routes.js # Route definitions for books
│
├── .env # Contains DB connection string & PORT
├── server.js # App entry point
├── package.json
└── README.md


---

## 🚀 Getting Started

### 🔧 Install dependencies

```bash
npm install
```
⚙️ Environment Setup
Create a .env file and add:
DB_URL=mongodb+srv://<userName>:<password>@cluster0.oq7ta2e.mongodb.net/

▶️ Run the server
```bash
pnpm run dev
```
Server will start at: http://localhost:3000

🔌 MongoDB Connection
In database/db.js:
```js
const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
};

module.exports = connectToDB;
```

🔖 Book Schema (Validation Included)
In models/book.js:
```js
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    maxLength: [100, 'Title too long']
  },
  author: {
    type: String,
    trim: true,
    required: [true, 'Author name is required']
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1000, 'Year too old'],
    max: [new Date().getFullYear(), 'Year in future']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', BookSchema);
```
✅ Features
🔒 Validation: Field-level validation using Mongoose (e.g., max length, required fields, year limits)
🔧 Modular Structure: Routes, controllers, models, and helpers separated
🔁 Reusable Helpers:
    sendResponse(success, message, data, status, res)
    isValidId(id) for ObjectId validation
🌐 Environment Config: Using .env for secure and flexible configs
🔁 Scalable Routing: All book routes handled in a dedicated router

🧠 Error Handling & Status Codes
| Code | Meaning               | When?                       |
| ---- | --------------------- | --------------------------- |
| 200  | OK                    | Success responses           |
| 201  | Created               | New book created            |
| 400  | Bad Request           | Missing/invalid inputs      |
| 404  | Not Found             | Book not found / invalid ID |
| 500  | Internal Server Error | DB failures / catch blocks  |


Made with ❤️ by Waqar Rana