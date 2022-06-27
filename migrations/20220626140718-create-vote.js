'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('votes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      voterAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      candidateAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ElectionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'elections',
          key: 'id',
        },
        field: 'ElectionId'
      },
      txHash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('votes');
  }
};