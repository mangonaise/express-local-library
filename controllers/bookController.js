const Book = require('../models/book');

// Display list of all books.
exports.bookList = (req, res) => {
  res.send('NOT IMPLEMENTED: Book list');
};

// Display detail page for a specific book.
exports.bookDetail = (req, res) => {
  res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
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