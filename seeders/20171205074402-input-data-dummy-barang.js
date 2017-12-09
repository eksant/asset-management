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
    return queryInterface.bulkInsert('Barangs', [{
      nama_barang: 'Monitor AOC 21 Inc',
      stock : 65,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nama_barang: 'Keyboard Logitech',
      stock : 75,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nama_barang: 'Mouse Logitech',
      stock : 80,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nama_barang: 'Projector BenQ ms531',
      stock : 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nama_barang: 'Bangku RGotec',
      stock : 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nama_barang: 'Lampu Philips',
      stock : 35,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nama_barang: 'Meja Kayu 4 X 1 Meter',
      stock : 12,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nama_barang: 'Meja Dorong Lipat 4 X 0.5 Meter',
      stock : 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
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
