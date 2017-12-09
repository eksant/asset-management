'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RequestBarangs', [{
      UserId: 3,
      BarangId: 1,
      quantity: 5,
      tgl_pinjam: new Date(),
      approval: 1,
      createdAt   : new Date(),
      updatedAt   : new Date()
    }, {
      UserId: 3,
      BarangId: 2,
      quantity: 1,
      tgl_pinjam: new Date(),
      approval: 1,
      createdAt   : new Date(),
      updatedAt   : new Date()
    }, {
      UserId: 2,
      BarangId: 4,
      quantity: 1,
      tgl_pinjam: new Date(),
      approval: 1,
      createdAt   : new Date(),
      updatedAt   : new Date()
    }], {});
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
