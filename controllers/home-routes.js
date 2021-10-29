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

router.get('/book/:id', (req, res) => {
  Book.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'created_at',
     
    ],
    include: [
      {
        model: Character,
        attributes: ['id', 'name', 'notes', 'book_id'],
      },
    
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const book = dbPostData.get({ plain: true });

      // pass data to template
      res.render('single-post', { book });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;