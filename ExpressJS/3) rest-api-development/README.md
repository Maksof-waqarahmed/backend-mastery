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

✏️ Update an Existing Book
```http
PUT /books/:id
```

Description:
Update the title of an existing book by ID.

JSON Body Required:
```json
{ "title": "Updated Title" }
```

Success Response:
```json
{
  "message": "Book updated successfully",
  "data": { "id": 2, "title": "Updated Title" }
}
```

Error Responses:
404: Book not found
400: Missing title

❌ Delete a Book
```http
DELETE /books/:id
```

Description:
Delete a book from the list by ID.

Success Response:
```json
{ "message": "Book deleted successfully" }
```

404 Error Response:
```json
{ "message": "Book not found with id 99" }
```

🧠 Concepts Covered

| Concept               | Description                                         |
| --------------------- | --------------------------------------------------- |
| **CRUD Operations**   | Create, Read, Update, Delete using REST principles  |
| **`express.json()`**  | Middleware to parse incoming JSON request bodies    |
| **Routing**           | `.get()`, `.post()`, `.put()`, `.delete()` routes   |
| **URL Params**        | `req.params.id` to access dynamic route segments    |
| **Status Codes**      | 200 OK, 201 Created, 400 Bad Request, 404 Not Found |
| **In-Memory Storage** | Data stored in a simple array (no database)         |
| **Error Handling**    | Handled gracefully with messages and status codes   |


🔒 Note
This project uses in-memory data only, meaning:
Data will reset when the server restarts.
It’s ideal for learning & prototyping.
Later you can connect it to a database like MongoDB or PostgreSQL.

📌 Example API Workflow
GET /books → See all books
POST /books → Add a new book
GET /books/:id → Get specific book
PUT /books/:id → Update book
DELETE /books/:id → Remove book

Happy coding! 🚀
Made with ❤️ using Node.js and Express.