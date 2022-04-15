'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Outlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Outlet.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name can't be NULL."
        },
        notEmpty: {
          msg: "Name can't be empty."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email can't be NULL."
        },
        notEmpty: {
          msg: "Email can't be empty."
        },
        isEmail: {
          msg: "Email not valid."
        }
      }
    },
    apiKey: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: "API Key can't be NULL."
        },
        notEmpty: {
          msg: "API Key can't be empty."
        }
      }
    }
  }, {
    sequelize,
    tableName: 'outlets',
    modelName: 'Outlet',
  });
  return Outlet;
};