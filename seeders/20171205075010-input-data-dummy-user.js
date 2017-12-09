'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email       : 'admin@admin.com',
      password    : 'password',
      role        : 'admin',
      createdAt   : new Date(),
      updatedAt   : new Date()
    }, {
      email       : 'user_1@user.com',
      password    : '123456',
      role        : 'user',
      createdAt   : new Date(),
      updatedAt   : new Date()
    }, {
      email       : 'user_2@user.com',
      password    : '654321',
      role        : 'user',
      createdAt   : new Date(),
      updatedAt   : new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
