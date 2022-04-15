'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // do nothing
    // queryInterface.dropTable('designations');
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.resolve();
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
