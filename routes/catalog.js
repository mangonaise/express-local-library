const express = require('express');
const router = express.Router();

// Controller modules
const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const genreController = require('../controllers/genreController');
const bookInstanceController = require('../controllers/bookInstanceController');

// Catalog page route

router.get('/', (req, res) => {
  res.send('NOT IMPLEMENTED: Site Home Page');
});

/// BOOK ROUTES ///

router.get('/book/create', bookController.bookCreateGET);
router.post('/book/create', bookController.bookCreatePOST);

router.get('/book/:id/delete', bookController.bookDeleteGET);
router.post('/book/:id/delete', bookController.bookDeletePOST);

router.get('/book/:id/update', bookController.bookUpdateGET);
router.post('/book/:id/update', bookController.bookUpdatePOST);

router.get('/book/:id', bookController.bookDetail);
router.get('/books', bookController.bookList);

/// AUTHOR ROUTES ///

router.get('/author/create', authorController.authorCreateGET);
router.post('/author/create', authorController.authorCreatePOST);

router.get('/author/:id/delete', authorController.authorDeleteGET);
router.post('/author/:id/delete', authorController.authorDeletePOST);

router.get('/author/:id/update', authorController.authorUpdateGET);
router.post('/author/:id/update', authorController.authorUpdatePOST);

router.get('/author/:id', authorController.authorDetail);
router.get('/authors', authorController.authorList);

/// GENRE ROUTES ///

router.get('/genre/create', genreController.genreCreateGET);
router.post('/genre/create', genreController.genreCreatePOST);

router.get('/genre/:id/delete', genreController.genreDeleteGET);
router.post('/genre/:id/delete', genreController.genreDeletePOST);

router.get('/genre/:id/update', genreController.genreUpdateGET);
router.post('/genre/:id/update', genreController.genreUpdatePOST);

router.get('/genre/:id', genreController.genreDetail);
router.get('/genres', genreController.genreList);

/// BOOK INSTANCE ROUTES ///

router.get('/bookInstance/create', bookInstanceController.bookInstanceCreateGET);
router.post('/bookInstance/create', bookInstanceController.bookInstanceCreatePOST);

router.get('/bookInstance/:id/delete', bookInstanceController.bookInstanceDeleteGET);
router.post('/bookInstance/:id/delete', bookInstanceController.bookInstanceDeletePOST);

router.get('/bookInstance/:id/update', bookInstanceController.bookInstanceUpdateGET);
router.post('/bookInstance/:id/update', bookInstanceController.bookInstanceUpdatePOST);

router.get('/bookInstance/:id', bookInstanceController.bookInstanceDetail);
router.get('/bookInstances', bookInstanceController.bookInstanceList);

module.exports = router;