const Genre = require('../models/genre');

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
exports.genreDetail = (req, res) => {
  res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
};

// Display Genre create form on GET.
exports.genreCreateGET = (req, res) => {
  res.send('NOT IMPLEMENTED: Genre create GET');
};

// Handle Genre create on POST.
exports.genreCreatePOST = (req, res) => {
  res.send('NOT IMPLEMENTED: Genre create POST');
};

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