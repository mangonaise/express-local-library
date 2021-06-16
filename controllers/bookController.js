const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Book = require('../models/book');
const BookInstance = require('../models/bookInstance');
const Author = require('../models/author');
const Genre = require('../models/genre');

const bookValidation = [
  body('title', 'Title required').trim().isLength({ min: 1 }).escape(),
  body('author', 'Author required').trim().isLength({ min: 1 }).escape(),
  body('summary', 'Summary required').trim().isLength({ min: 1 }).escape(),
  body('isbn', 'ISBN required').trim().isLength({ min: 1 }).escape(),
  body('genre.*').escape(),
]

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
exports.bookCreateGET = async (req, res, next) => {
  try {
    const [authors, genres] = await getAuthorsAndGenres();
    res.render('bookForm', { title: 'Create Book', authors, genres });
  } catch (err) {
    next(err);
  }
};

// Handle book create on POST.
exports.bookCreatePOST = [
  createGenreArray,
  ...bookValidation,
  createOrUpdateBook
];

// Display book delete form on GET.
exports.bookDeleteGET = async (req, res, next) => {
  try {
    const [book, bookInstances] = await Promise.all([
      Book.findById(req.params.id),
      BookInstance.find({ book: req.params.id })
    ]);
    res.render('bookDelete', { title: `Delete Book: ${book.title}`, book, bookInstances })
  } catch (err) {
    next(err);
  }
};

// Handle book delete on POST.
exports.bookDeletePOST = async (req, res, next) => {
  try {
    const [book, bookInstances] = await Promise.all([
      Book.findById(req.params.id),
      BookInstance.find({ book: req.params.id })
    ]);

    if (bookInstances.length > 0) {
      res.render('bookDelete', { title: `Delete Book: ${book.title}`, book, bookInstances })
    } else {
      await Book.findByIdAndDelete(book._id);
      res.redirect('/catalog/books');
    }
  } catch (err) {
    next(err);
  }
};

// Display book update form on GET.
exports.bookUpdateGET = async (req, res, next) => {
  try {
    const [book, [authors, genres]] = await Promise.all([
      Book.findById(req.params.id).populate('author').populate('genre'),
      getAuthorsAndGenres()
    ]);
    const bookGenreIds = book.genre.map(genre => genre._id);
    genres.forEach(genre => { if (bookGenreIds.includes(genre._id)) genre.checked = 'true' });
    res.render('bookForm', { title: 'Update Book', book, authors, genres });
  } catch (err) {
    next(err);
  }
};

// Handle book update on POST.
exports.bookUpdatePOST = [
  createGenreArray,
  ...bookValidation,
  createOrUpdateBook
];

async function getAuthorsAndGenres() {
  const [authors, genres] = await Promise.all([
    Author.find(),
    Genre.find()
  ]);
  authors.sort((a, b) => a.familyName.toUpperCase() < b.familyName.toUpperCase() ? -1 : 1);
  return [authors, genres];
}

async function createOrUpdateBook(req, res, next) {
  try {
    const validationErrors = validationResult(req);
    const bookProperties = {
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre
    }
    if (req.params.id) {
      bookProperties._id = req.params.id;
    }
    const book = new Book(bookProperties);
    if (!validationErrors.isEmpty()) {
      const [authors, genres] = await getAuthorsAndGenres();
      genres.forEach(genre => { if (book.genre.includes(genre._id)) genre.checked = 'true' });
      res.render('bookForm', { title: 'Create Book', authors, genres, book, errors: validationErrors.mapped() });
    } else {
      if (req.params.id) {
        await Book.findByIdAndUpdate(req.params.id, book);
      } else {
        await book.save();
      }
      res.redirect(book.url);
    }
  } catch (err) {
    next(err);
  }
}

function createGenreArray(req, res, next) {
  if (!(req.body.genre instanceof Array)) {
    if (typeof req.body.genre === 'undefined') {
      req.body.genre = []
    } else {
      req.body.genre = new Array(req.body.genre);
    }
  }
  next();
}