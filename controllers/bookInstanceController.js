const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Book = require('../models/book');
const BookInstance = require('../models/bookInstance');

const statuses = ['maintenance', 'available', 'loaned', 'reserved'];

// Display list of all BookInstances.
exports.bookInstanceList = async (req, res) => {
  try {
    const list = await BookInstance.find({}).populate('book');
    res.render('bookInstanceList', { title: 'Book Instance List', list });
  } catch (err) {
    next(err);
  }
};

// Display detail page for a specific BookInstance.
exports.bookInstanceDetail = async (req, res, next) => {
  try {
    const bookInstance = await BookInstance
      .findById(req.params.id)
      .populate('book');
    res.render('bookInstanceDetail', { bookInstance });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      err = new Error('Book instance not found.');
      err.status = 404;
    }
    next(err);
  }
};

// Display BookInstance create form on GET.
exports.bookInstanceCreateGET = async (req, res, next) => {
  try {
    const books = await Book.find({}, 'title');
    res.render('bookInstanceForm', { title: 'Create Book Instance', books, statuses });
  } catch (err) {
    next(err);
  }
};

// Handle BookInstance create on POST.
exports.bookInstanceCreatePOST = [
  body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
  body('imprint', 'Imprint required').trim().isLength({ min: 1 }).escape(),
  body('status').isIn(['maintenance', 'available', 'loaned', 'reserved']),
  body('due', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      const bookInstance = new BookInstance({
        book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due: req.body.due
      });
      if (!errors.isEmpty()) {
        const books = await Book.find({}, 'title');
        res.render('bookInstanceForm', { title: 'Create Book Instance', bookInstance, books, statuses, errors: errors.mapped() });
      } else {
        await bookInstance.save();
        res.redirect(bookInstance.url);
      }
    } catch (err) {
      next(err);
    }
  }
];

// Display BookInstance delete form on GET.
exports.bookInstanceDeleteGET = async (req, res, next) => {
  try {
    const bookInstance = await BookInstance.findById(req.params.id).populate('book');
    res.render('bookInstanceDelete', { title: `Delete Book Instance ${bookInstance._id}`, bookInstance });
  } catch (err) {
    next(err);
  }
};

// Handle BookInstance delete on POST.
exports.bookInstanceDeletePOST = async (req, res, next) => {
  try {
    await BookInstance.findByIdAndDelete(req.params.id);
    res.redirect('/catalog/bookInstances');
  } catch (err) {
    next(err);
  }
};

// Display BookInstance update form on GET.
exports.bookInstanceUpdateGET = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// Handle bookInstance update on POST.
exports.bookInstanceUpdatePOST = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance update POST');
};