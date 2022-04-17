'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('registeredVoters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      ElectionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'elections',
          key: 'id'
        }
      },
      VoterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'voters',
          key: 'id'
        }
      },
      GivenId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      registered: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '0'
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
    await queryInterface.dropTable('registeredVoters');
  }
};