'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tempats', [{
      nama_tempat : 'Gudang Hacktiv8',
      deskripsi   : '',
      createdAt   : new Date(),
      updatedAt   : new Date()
    }, {
      nama_tempat : 'Ruang Laboratorium',
      deskripsi   : '',
      createdAt   : new Date(),
      updatedAt   : new Date()
    }, {
      nama_tempat : 'Ruang Lecture',
      deskripsi   : '',
      createdAt   : new Date(),
      updatedAt   : new Date()
    }, {
      nama_tempat : 'Ruang Pantry',
      deskripsi   : '',
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
