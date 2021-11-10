const router = require('express').Router();
const sequelize = require('../config/connection');
const { Book, User, Character } = require('../models');




router.get('/', (req, res) => {
  console.log(req.session);

  Book.findAll({
    where:{user_id: req.session.user_id},
    attributes: [
      'id',
      'title',
      'created_at',
      'user_id'
    ],
  
  })
    .then(dbPostData => {
  const books = dbPostData.map(book => book.get({ plain: true }));
        res.render('homepage', {books} );
    })
    .catch(err => {
      console.log(err);
      res.redirect('/login');
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
      ['id','bookId'],
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

router.get('/character/:id', (req, res) => {
  Character.findByPk(req.params.id, {
    attributes: [
      'id',
      'name',
      'notes',
      'book_id']

    
  })
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        
        res.render('single-post', {
          post,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;