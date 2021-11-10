const router = require('express').Router();
const { Book, User, Character } = require('../../models');

router.get('/', (req, res) => {
  console.log('======================');
  Book.findAll({
    attributes: [
      'id',
     
      'title',
      'created_at',
      
    ],
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get('/:id', (req, res) => {
  Book.findOne({
  where: {
    id: req.params.id
  },
   attributes: [
      ['id','bookId'],
      'title',
      'user_id',
   ],
  include: [
    {
      model: Character,
      attributes: ['id', 'name', 'notes']
    },
  ]
})
  .then(dbBookData => {
    console.log(dbBookData);
    if (!dbBookData) {
      return res.status(404).json({ message: 'No book found with this id' });
    }
    return res.status(200).json(dbBookData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Book.create({
    title: req.body.title,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
