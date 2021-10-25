// import all models
const Book = require('./Book');
const Character = require('./Character');
const User = require('./User');

// create associations
User.hasMany(Book, {
  foreignKey: 'user_id'
});

Book.belongsTo(User, {
  foreignKey: 'user_id'
});

Book.hasMany(Character,{
  foreignKey: 'book_id'
})

Character.belongsTo(Book, {
  foreignKey: 'book_id'
})

module.exports = { User, Book, Character };