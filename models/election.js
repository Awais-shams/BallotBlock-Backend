'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Election extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Organization)
      this.hasMany(models.Candidate)
      this.hasMany(models.Vote, {
        foreignKey: 'ElectionId'
      });
      this.belongsToMany(models.Voter, { through: 'RegisteredVoter' });
    }
    toJSON() {
      return { ...this.get() }
    }
  };
  Election.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "NOT DEPLOYED"
    },
    contractAddress: {
      type: DataTypes.STRING,
    },
    deployTxHash: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    tableName: 'elections',
    modelName: 'Election',
  });
  return Election;
};