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
      'designations',
      'OrganizerId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'organizers',
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
      'designations',
      'OrganizerId'
    )
  }
};
