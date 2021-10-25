const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const bookRoutes = require('./book-routes');
const characterRoutes = require('./character-routes')

router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/character', characterRoutes)

module.exports = router;