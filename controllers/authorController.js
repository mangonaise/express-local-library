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
  res.send('NOT IMPLEMENTED: Author create GET');
}

// Handle Author create on POST.
exports.authorCreatePOST = (req, res) => {
  res.send('NOT IMPLEMENTED: Author create POST');
};

// Display Author delete form on GET.
exports.authorDeleteGET = (req, res) => {
  res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.authorDeletePOST = (req, res) => {
  res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.authorUpdateGET = (req, res) => {
  res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.authorUpdatePOST = (req, res) => {
  res.send('NOT IMPLEMENTED: Author update POST');
};