'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Designation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return { ...this.get(), id: undefined }
    }
  };
  Designation.init({
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        notNull: {
          msg: "UUID can't be NULL."
        },
        notEmpty: {
          msg: "UUID can't be empty."
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "UUID can't be NULL."
        },
        notEmpty: {
          msg: "UUID can't be empty."
        }
      }
    },
    officeLocation:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "UUID can't be NULL."
        },
        notEmpty: {
          msg: "UUID can't be empty."
        }
      }
    }
  }, {
    sequelize,
    tableName: 'designations',
    modelName: 'Designation',
  });
  return Designation;
};