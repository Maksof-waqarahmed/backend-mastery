# 📚 Book Store REST API – Node.js & Express

This is a simple **RESTful API** built with **Node.js** and **Express.js** to manage a book collection. It demonstrates CRUD operations using **in-memory data** (no database yet), suitable for beginners learning API development.

---

## 🚀 Technologies Used

- Node.js
- Express.js
- JavaScript (ES6)
- REST API concepts

---

## 📦 Setup Instructions

### 1. Install Node.js  
Download and install from [https://nodejs.org](https://nodejs.org)

### 2. Initialize the project

```bash
npm init -y
```
3. Install Express
```bash
npm install express
```

4. Run the server
```bash
node server.js
```

Server will run on:
```arduino
http://localhost:3000
```

📚 API Endpoints
✅ Base Route

```http
GET /
```
Description:
Returns a welcome message.

Response:
```json
{ "message": "Welcome to my book store" }
```
📖 Get All Books
```http
GET /books
```
Description:
Returns a list of all books.

Sample Response:
```json
[
  { "id": 1, "title": "Book 1" },
  { "id": 2, "title": "Book 2" }
]
```

📘 Get a Single Book by ID
```http
GET /books/:id
```

Description:
Fetch a book by its ID.

Example:
```bash
GET /books/2
```
Success Response:
```json
{
  "message": "Successfully fetched the book",
  "data": { "id": 2, "title": "Book 2" }
}
```

404 Response:
```json
{ "message": "Book not found" }
```

➕ Add a New Book
```http
POST /books
```
Description:
Add a new book using JSON data.

Required JSON Body:
```json
{ "title": "New Book Title" }
```
Success Response:
```json
{
  "message": "Book added successfully",
  "data": { "id": 4, "title": "New Book Title" }
}
```
400 Error Response:
```json
{ "message": "Book title is required" }
```