const router = require('express').Router();
const { Character, User, Book } = require('../../models');

router.post('/', (req, res) => {
  Character.create({
  name: req.body.name,
  notes: req.body.notes,

  book_id: req.body.book_id
})
  .then(dbCharacterData => res.json(dbCharacterData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });

});

router.get('/', (req, res) => {
  Character.findAll({
  attributes: { exclude: ['password'] }
})
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
  Character.findOne({
  where: {
    id: req.params.id
  },
  include: [
    {
      model: Book,
      attributes: ['id', 'title', 'created_at']
    }
  ]
})
  .then(dbCharData => {
    if (!dbCharData) {
      res.status(404).json({ message: 'No character with this id' });
      return;
    }
    res.json(dbCharData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Character.update(
    {
      name: req.body.name,
      notes: req.body.notes
    },
  
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No character found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Character.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No character found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
