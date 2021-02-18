'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Room.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    skywayKey: DataTypes.STRING,
    name: DataTypes.STRING,
    admin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room',
    freezeTableName: true,
    timestamps: false
  });
  return Room;
};