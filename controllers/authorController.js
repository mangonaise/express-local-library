const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Author = require('../models/author');
const Book = require('../models/book');

// Display list of all Authors.
exports.authorList = async (req, res, next) => {
  try {
    const list = await Author.find({}).sort({ familyName: 'asc' });
    res.render('authorList', { title: 'Author List', list });
  } catch (err) {
    next(err);
  }
}

// Display detail page for a specific Author.
exports.authorDetail = async (req, res, next) => {
  try {
    const author = await Author
      .findById(req.params.id);
    const books = await Book
      .find({ author: req.params.id });
    res.render('authorDetail', { author, books });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      err = new Error('Author not found.');
      err.status = 404;
    }
    next(err);
  }
}

// Display Author create form on GET
exports.authorCreateGET = (req, res) => {
  res.render('authorForm', { title: 'Create Author ' });
}

// Handle Author create on POST.
exports.authorCreatePOST = [
  body('firstName').trim().isLength({ min: 1 }).escape().withMessage('First name required')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters'),
  body('familyName').trim().isLength({ min: 1 }).escape().withMessage('Family name required')
    .isAlphanumeric().withMessage('Family name has non-alphanumeric characters'),
  body('dateOfBirth').optional({ checkFalsy: true }).isISO8601().toDate(),
  body('dateOfDeath').optional({ checkFalsy: true }).isISO8601().toDate(),
  async (req, res, next) => {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        res.render('authorForm', { title: 'Create Author', author: req.body, errors: validationErrors.mapped() });
      } else {
        const author = new Author({
          firstName: req.body.firstName,
          familyName: req.body.familyName,
          dateOfBirth: req.body.dateOfBirth,
          dateOfDeath: req.body.dateOfDeath
        });
        await author.save();
        res.redirect(author.url);
      }
    } catch (err) {
      next(err);
    }
  }
];

// Display Author delete form on GET.
exports.authorDeleteGET = async (req, res, next) => {
  try {
    const [author, books] = await Promise.all([
      Author.findById(req.params.id),
      Book.find({ author: req.params.id })
    ]);
    res.render('authorDelete', { title: `Delete Author: ${author.name}`, author, books });
  } catch (err) {
    next(err);
  }
};

// Handle Author delete on POST.
exports.authorDeletePOST = async (req, res, next) => {
  try {
    const [author, books] = await Promise.all([
      Author.findById(req.params.id),
      Book.find({ author: req.params.id })
    ]);

    if (books.length > 0) {
      res.render('authorDelete', { title: `Delete Author: ${author.name}`, author, books });
    } else {
      await Author.findByIdAndDelete(author._id);
      res.redirect('/catalog/authors');
    }
    res.render('authorDelete', { title: `Delete Author: ${author.name}`, author, books });
  } catch (err) {
    next(err);
  }
};

// Display Author update form on GET.
exports.authorUpdateGET = (req, res) => {
  res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.authorUpdatePOST = (req, res) => {
  res.send('NOT IMPLEMENTED: Author update POST');
};