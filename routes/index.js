var express = require('express');
var router = express.Router();
var Store = require('../modal/GR2.modal');

// GET request for creating a Store
router.get('/create', function (req, res, next) {
  res.render('create'); // Render the create form
});

// POST request for creating a new Store
router.post('/create', function (req, res, next) {
  var newStore = new Store({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author
  });
  newStore.save()
    .then(function (store) {
      res.redirect('/'); // Redirect to the home page after creating the Store
    })
    .catch(function (err) {
      console.log(err);
      res.redirect('/create'); // Redirect back to the create form in case of an error
    });
});

// GET request for reading all Stores
router.get('/', async function (req, res, next) {
  try {
    let stores = await Store.find();
    res.render('index', { Stores: stores }); // Pass the stores to the template
  } catch (err) {
    console.log(err);
    res.render('index', { Stores: [] });
  }
});

// POST request for updating a Store
router.post("/update", function (req, res, next) {
  var id = req.body.id;
  Store.findById(id, function (err, store) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      store.title = req.body.title;
      store.description = req.body.description;
      store.author = req.body.author;
      store.save()
        .then(function (updatedStore) {
          res.redirect('/');
        })
        .catch(function (err) {
          console.log(err);
          res.redirect('/');
        });
    }
  });
});

// POST request for deleting a Store
router.post("/delete", function (req, res, next) {
  var id = req.body.id;
  Store.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

module.exports = router;

