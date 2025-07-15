const express = require('express');
const { createBook, deleteBook, getAllBooks, getBookByID, updateBook } = require('../controller/book-controller')

// create a express router
const router = express.Router();

//all the route that are related to books only
router.get('/get', getAllBooks);
router.get('/get/:id', getBookByID);
router.post('/create', createBook);
router.put('/update/:id', updateBook);
router.delete('/delete/:id', deleteBook);

module.exports = router;