const BookModel = require('../models/book');
const { sendResponse, isValidId } = require('../helper');

const getAllBooks = async (_, res) => {
    try {
        const books = await BookModel.find();
        return sendResponse(!!books.length, books.length ? "Books fetched" : "No books found", books, books.length ? 200 : 404, res);
    } catch (error) {
        console.error("GetAllBooks Error:", error.message);
        return sendResponse(false, "Server Error", "", 500, res);
    }
};

const getBookByID = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) return sendResponse(false, "Invalid ID format", "", 400, res);

        const book = await BookModel.findById(id);
        if (!book) return sendResponse(false, "Book not found", "", 404, res);

        return sendResponse(true, "Book fetched", book, 200, res);
    } catch (error) {
        console.error("GetBookByID Error:", error.message);
        return sendResponse(false, "Server Error", "", 500, res);
    }
};

const createBook = async (req, res) => {
    try {
        const book = new BookModel(req.body);
        await book.save();
        return sendResponse(true, "Book created", book, 201, res);
    } catch (error) {
        console.error("CreateBook Error:", error.message);
        return sendResponse(false, "Validation failed or bad request", "", 400, res);
    }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) return sendResponse(false, "Invalid ID format", "", 400, res);

        const updates = req.body;
        if (!Object.keys(updates).length) return sendResponse(false, "No update data provided", "", 400, res);

        const book = await BookModel.findByIdAndUpdate(id, { $set: updates }, { new: true });
        if (!book) return sendResponse(false, "Book not found", "", 404, res);

        return sendResponse(true, "Book updated", book, 200, res);
    } catch (error) {
        console.error("UpdateBook Error:", error.message);
        return sendResponse(false, "Update failed", "", 500, res);
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) return sendResponse(false, "Invalid ID format", "", 400, res);

        const book = await BookModel.findByIdAndDelete(id);
        if (!book) return sendResponse(false, "Book not found", "", 404, res);

        return sendResponse(true, "Book deleted", book, 200, res);
    } catch (error) {
        console.error("DeleteBook Error:", error.message);
        return sendResponse(false, "Deletion failed", "", 500, res);
    }
};

module.exports = { getAllBooks, getBookByID, createBook, updateBook, deleteBook };
