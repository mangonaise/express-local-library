const mongoose = require('mongoose');
const BookInstance = require('../models/bookInstance');

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
exports.bookInstanceCreateGET = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance create GET');
};

// Handle BookInstance create on POST.
exports.bookInstanceCreatePOST = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance create POST');
};

// Display BookInstance delete form on GET.
exports.bookInstanceDeleteGET = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

// Handle BookInstance delete on POST.
exports.bookInstanceDeletePOST = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

// Display BookInstance update form on GET.
exports.bookInstanceUpdateGET = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// Handle bookInstance update on POST.
exports.bookInstanceUpdatePOST = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance update POST');
};