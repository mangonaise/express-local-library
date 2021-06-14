const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Book = require('../models/book');
const BookInstance = require('../models/bookInstance');
const Author = require('../models/author');
const Genre = require('../models/genre');

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
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === 'undefined') {
        req.body.genre = []
      } else {
        req.body.genre = new Array(req.body.genre);
      }
    }
    next();
  },

  body('title', 'Title required').trim().isLength({ min: 1 }).escape(),
  body('author', 'Author required').trim().isLength({ min: 1 }).escape(),
  body('summary', 'Summary required').trim().isLength({ min: 1 }).escape(),
  body('isbn', 'ISBN required').trim().isLength({ min: 1 }).escape(),
  body('genre.*').escape(),

  async (req, res, next) => {
    try {
      const validationErrors = validationResult(req);
      const book = new Book({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        isbn: req.body.isbn,
        genre: req.body.genre
      });
      if (!validationErrors.isEmpty()) {
        const [authors, genres] = await getAuthorsAndGenres();
        for (let i = 0; i < genres.length; i++) {
          if (book.genre.indexOf(genres[i]._id) > -1) {
            genres[i].checked = 'true';
          }
        }
        res.render('bookForm', { title: 'Create Book', authors, genres, book, errors: validationErrors.mapped() });
      } else {
        await book.save();
        res.redirect(book.url);
      }
    } catch (err) {
      next(err);
    }
  }
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
exports.bookUpdateGET = (req, res) => {
  res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.bookUpdatePOST = (req, res) => {
  res.send('NOT IMPLEMENTED: Book update POST');
};

async function getAuthorsAndGenres() {
  const [authors, genres] = await Promise.all([
    Author.find(),
    Genre.find()
  ]);
  authors.sort((a, b) => a.familyName.toUpperCase() < b.familyName.toUpperCase() ? -1 : 1);
  return [authors, genres];
}