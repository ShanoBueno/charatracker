const router = require('express').Router();
const { Book, User, Character } = require('../../models');

router.get('/:id', (req, res) => {
  Book.findOne({
  where: {
    id: req.params.id
  },
  include: [
    {
      model: Character,
      attributes: ['id', 'name', 'notes']
    },
  ]
})
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Book.create({
    title: req.body.title,
    user_id: req.body.user_id
  })
    .then(dbBookData => res.json(dbBookData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
