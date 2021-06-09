const mongoose = require('mongoose');
const Book = require('../models/book');
const BookInstance = require('../models/bookInstance');

// Display list of all books.
exports.bookList = async (req, res, next) => {
  try {
    const list = await Book
      .find({}, 'title author', { sort: { title: 'asc' } })
      .populate('author');
    res.render('bookList', { title: 'Book List', list });
  } catch (err) {
    next(err);
  }
};

// Display detail page for a specific book.
exports.bookDetail = async (req, res, next) => {
  try {
    const book = await Book
      .findById(req.params.id)
      .populate('author genre');
    const copies = await BookInstance
      .find({ book: req.params.id })
    res.render('bookDetail', { book, copies });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      err = new Error('Book not found.');
      err.status = 404;
    }
    next(err);
  }
};

// Display book create form on GET.
exports.bookCreateGET = (req, res) => {
  res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.
exports.bookCreatePOST = (req, res) => {
  res.send('NOT IMPLEMENTED: Book create POST');
};

// Display book delete form on GET.
exports.bookDeleteGET = (req, res) => {
  res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.bookDeletePOST = (req, res) => {
  res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.bookUpdateGET = (req, res) => {
  res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.bookUpdatePOST = (req, res) => {
  res.send('NOT IMPLEMENTED: Book update POST');
};