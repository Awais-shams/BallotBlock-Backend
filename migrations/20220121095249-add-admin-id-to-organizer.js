'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn(
      'organizers',
      'AdminId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'admins',
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
    return queryInterface.removeColumn(
      'organizers',
      'AdminId'
    )
  }
};
