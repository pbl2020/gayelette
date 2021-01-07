'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    roomId: DataTypes.STRING,
    userId: DataTypes.STRING,
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
    angle: DataTypes.INTEGER,
    time: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};