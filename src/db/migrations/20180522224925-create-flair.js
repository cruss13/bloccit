'use strict';
module.exports = {

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Flairs');
  }
};
