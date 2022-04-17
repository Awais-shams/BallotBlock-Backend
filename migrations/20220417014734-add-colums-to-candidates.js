'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      'candidates',
      'publicAddress',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    return queryInterface.addColumn(
      'candidates',
      'electionId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'elections',
          key: 'id',
        },
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     queryInterface.removeColumn(
      'candidates',
      'publicAddress'
    );
    return queryInterface.removeColumn(
      'candidates',
      'electionId'
    )
  }
};
