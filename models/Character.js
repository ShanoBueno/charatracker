const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model {}

Character.init(
  {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true


    },
    name:{
      type:DataTypes.STRING,
      allowNull: false

    },
    notes:{
      type:DataTypes.STRING,

    },
      book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'book',
        key: 'id'
      }
    },
  },
  {
     sequelize: sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'character'
  }
)

module.exports = Character;

