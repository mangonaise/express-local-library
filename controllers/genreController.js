const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Genre = require('../models/genre');
const Book = require('../models/book');

// Display list of all Genres.
exports.genreList = async (req, res, next) => {
  try {
    const list = await Genre.find({}).sort({ name: 'asc' });
    res.render('genreList', { title: 'Genre List', list });
  } catch (err) {
    next(err);
  }
};

// Display detail page for a specific Genre.
exports.genreDetail = async (req, res, next) => {
  try {
    const [genre, books] = await Promise.all([
      Genre.findById(req.params.id),
      Book.find({ genre: req.params.id })
    ]);
    res.render('genreDetail', { genre, books });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      err = new Error('Genre not found.');
      err.status = 404;
    }
    next(err);
  }
};

// Display Genre create form on GET.
exports.genreCreateGET = (req, res) => {
  res.render('genreForm', { title: 'Create Genre' });
};

// Handle Genre create on POST.
exports.genreCreatePOST = [
  body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),
  async (req, res, next) => {
    try {
      const genre = new Genre({ name: req.body.name });
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        res.render('genreForm', { title: 'Create Genre', genre, errors: validationErrors.mapped() });
      } else {
        const existingGenre = await Genre.findOne({ name: req.body.name });
        if (existingGenre) {
          res.redirect(existingGenre.url);
        } else {
          await genre.save()
          res.redirect(genre.url);
        }
      }
    } catch (err) {
      next(err);
    }
  }
]

// Display Genre delete form on GET.
exports.genreDeleteGET = (req, res) => {
  res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genreDeletePOST = (req, res) => {
  res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genreUpdateGET = (req, res) => {
  res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genreUpdatePOST = (req, res) => {
  res.send('NOT IMPLEMENTED: Genre update POST');
};