const express = require('express');
const app = express();

// Middleware
app.use(express.json());
const PORT = 3000;

// In-memory books data
const books = [
    { id: 1, title: "Book 1" },
    { id: 2, title: "Book 2" },
    { id: 3, title: "Book 3" }
];

// GET: Welcome route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to my book store" });
});

// GET: All books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// GET: Specific book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(item => item.id === Number(req.params.id));

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
        message: "Successfully fetched the book",
        data: book
    });
});

// POST: Add a new book
app.post('/books', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Book title is required" });
    }

    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        title
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        data: newBook
    });
});

// PUT: Update a book
app.put('/books/:id', (req, res) => {
    try {
        const book = books.find(item => item.id === Number(req.params.id));

        if (!book) {
            return res.status(404).json({
                message: `Book not found with id ${req.params.id}`
            });
        }

        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Book title is required"
            });
        }

        book.title = title;

        res.status(200).json({
            message: "Book updated successfully",
            data: book
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

// DELETE: Delete a book
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(item => item.id === Number(req.params.id));

    if (bookIndex === -1) {
        return res.status(404).json({
            message: `Book not found with id ${req.params.id}`
        });
    }

    books.splice(bookIndex, 1);

    res.status(200).json({
        message: "Book deleted successfully"
    });
});

// Server
app.listen(PORT, () => {
    console.log(`Server is now listening on PORT ${PORT}`);
});
