'use strict';
module.exports = (sequelize, DataTypes) => {
  var Barang = sequelize.define('Barang', {
    nama_barang: DataTypes.STRING,
    stock: {
      type: DataTypes.INTEGER,
      validate:{
        isNumeric : { msg : 'data yang di input bukan nomor'},
      }
    }
  });
  Barang.associate = function (models) {
    Barang.belongsToMany(models.Tempat, {
      through: 'TempatBarang'
    })
    Barang.hasMany(models.TempatBarang)
    
  }
  Barang.afterCreate(function(data, options){
    return sequelize.models.TempatBarang.create({
      BarangId : data.id,
      TempatId : 1,
      quantity : data.stock,
      createdAt : new Date(),
      updatedAt : new Date(),
      isUpdated : 0
    })
  })
  return Barang;
};
