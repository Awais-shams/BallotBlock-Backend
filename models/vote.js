'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Election, {
        foreignKey: 'ElectionId'
      });
    }
  };
  Vote.init({
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
    voterAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Voter eth address can't be NULL."
        },
        notEmpty: {
          msg: "Voter eth address can't be empty."
        }
      }
    },
    candidateAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Candidate eth address can't be NULL."
        },
        notEmpty: {
          msg: "Candidate eth address can't be empty."
        }
      }
    },
    ElectionId: DataTypes.INTEGER,
    txHash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Transaction hash can't be NULL."
        },
        notEmpty: {
          msg: "Transaction hash can't be empty."
        }
      }
    }
  }, {
    sequelize,
    tableName: 'votes',
    modelName: 'Vote',
  });
  return Vote;
};