const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Genre = require('../models/genre');
const Book = require('../models/book');

const genreValidation = body('name', 'Genre name required').trim().isLength({ min: 1 }).escape();

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
  genreValidation,
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
exports.genreDeleteGET = async (req, res, next) => {
  try {
    const [genre, books] = await Promise.all([
      Genre.findById(req.params.id),
      Book.find({ genre: req.params.id })
    ]);
    res.render('genreDelete', { title: `Delete Genre: ${genre.name}`, genre, books });
  } catch (err) {
    next(err);
  }
};

// Handle Genre delete on POST.
exports.genreDeletePOST = async (req, res, next) => {
  try {
    const [genre, books] = await Promise.all([
      Genre.findById(req.params.id),
      Book.find({ genre: req.params.id })
    ]);

    if (books.length > 0) {
      res.render('genreDelete', { title: `Delete genre: ${genre.name}`, genre, books });
    } else {
      await Genre.findByIdAndDelete(genre._id);
      res.redirect('/catalog/genres');
    }
  } catch (err) {
    next(err);
  }
};

// Display Genre update form on GET.
exports.genreUpdateGET = async (req, res, next) => {
  try {
    const genre = await Genre.findById(req.params.id);
    res.render('genreForm', { title: 'Update genre', genre });
  } catch (err) {
    next(err);
  }
};

// Handle Genre update on POST.
exports.genreUpdatePOST = [
  genreValidation,
  createOrUpdateGenre
];

async function createOrUpdateGenre(req, res, next) {
  try {
    const genreProperties = { 
      name: req.body.name 
    }
    if (req.params.id) {
      genreProperties._id = req.params.id;
    }
    const genre = new Genre(genreProperties);
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.render('genreForm', { title: 'Create Genre', genre, errors: validationErrors.mapped() });
    } else {
      const existingGenre = await Genre.findOne({ name: req.body.name });
      if (existingGenre) {
        res.redirect(existingGenre.url);
      } else {
        if (req.params.id) {
          await Genre.findByIdAndUpdate(req.params.id, genre);
        } else {
          await genre.save();
        }
        res.redirect(genre.url);
      }
    }
  } catch (err) {
    next(err);
  }
}