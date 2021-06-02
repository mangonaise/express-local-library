const Author = require('../models/author');

// Display list of all Authors.
exports.authorList = (req, res) => {
  res.send('NOT IMPLEMENTED: Author list');
}

// Display detail page for a specific Author.
exports.authorDetail = (req, res) => {
  res.send('NOT IMPLEMENTED: Author detail ' + req.params.id);
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