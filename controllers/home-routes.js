const router = require('express').Router();
const sequelize = require('../config/connection');
const { Book, User, Character } = require('../models');




router.get('/', (req, res) => {
  console.log(req.session);

  Book.findAll({

    attributes: [
      'id',
      'title',
      'created_at',
    ],
  
  })
    .then(dbPostData => {
  const books = dbPostData.map(book => book.get({ plain: true }));
        res.render('homepage', {books} );
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;