'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('TempatBarangs', [{
      BarangId: 1,
      TempatId: 1,
      quantity: 65,
      createdAt: new Date(),
      updatedAt: new Date(),
      isUpdated : 0
    },{
      BarangId: 2,
      TempatId: 1,
      quantity: 75,
      createdAt: new Date(),
      updatedAt: new Date(),
      isUpdated : 0
    },{
      BarangId: 3,
      TempatId: 1,
      quantity: 80,
      createdAt: new Date(),
      updatedAt: new Date(),
      isUpdated : 0
    },{
      BarangId: 4,
      TempatId: 1,
      quantity: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      isUpdated : 0
    },{
      BarangId: 5,
      TempatId: 1,
      quantity: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
      isUpdated : 0
    },{
      BarangId: 6,
      TempatId: 1,
      quantity: 35,
      createdAt: new Date(),
      updatedAt: new Date(),
      isUpdated : 0
    },{
      BarangId: 7,
      TempatId: 1,
      quantity: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
      isUpdated : 0
    },{
      BarangId: 8,
      TempatId: 1,
      quantity: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      isUpdated : 0
    },])
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
