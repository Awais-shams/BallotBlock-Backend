'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Election);
    }
    toJSON() {
      return { ...this.get() }
    }
  };
  Organization.init({
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
      notNull: {
        msg: "Organization name can't be NULL."
      },
      notEmpty: {
        msg: "Organization name can't be empty."
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: "Organization location can't be NULL."
      },
      notEmpty: {
        msg: "Organization location can't be empty."
      },
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: "Organization website can't be NULL."
      },
      notEmpty: {
        msg: "Organization website can't be empty."
      },
      isUrl: {
        msg: "Invalid website URL."
      }
    }
  }, {
    sequelize,
    tableName: 'organizations',
    modelName: 'Organization',
  });
  return Organization;
};