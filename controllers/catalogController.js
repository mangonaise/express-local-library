const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookInstance');

exports.index = (req, res, next) => {
  Promise.all([
    Book.countDocuments(),
    BookInstance.countDocuments(),
    BookInstance.countDocuments({ status: 'available' }),
    Author.countDocuments(),
    Genre.countDocuments(),
  ]).then((results) => {
    const [bookCount, bookInstanceCount, bookInstanceAvailableCount, authorCount, genreCount] = results;
    const data = { bookCount, bookInstanceCount, bookInstanceAvailableCount, authorCount, genreCount };
    res.render('index', { title: 'Local Library Home', data });
  }).catch(err => {
    next(err)
  });
}