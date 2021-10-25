const router = require('express').Router();
const { Character, User, Book } = require('../../models');

router.post('/', (req, res) => {
  Character.create({
  name: req.body.name,
  notes: req.body.notes,
  user_id: req.body.user_id,
  book_id: req.body.book_id
})
  .then(dbCharacterData => res.json(dbCharacterData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });

});


module.exports = router;
