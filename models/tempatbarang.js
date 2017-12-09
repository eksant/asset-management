'use strict';
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Model = require('../models')
module.exports = function (sequelize, DataTypes) {
  var TempatBarang = sequelize.define('TempatBarang', {
    BarangId: DataTypes.INTEGER,
    TempatId: DataTypes.INTEGER,
    quantity: {
      type : DataTypes.INTEGER,
      validate:{
        isNumeric : {msg : 'Data yang di input bukan nomor'},
        
      }
    },
    isUpdated : DataTypes.INTEGER
  });
  TempatBarang.associate = function (models) {
    TempatBarang.belongsTo(models.Tempat, {
    })
    TempatBarang.belongsTo(models.Barang)
  }

  TempatBarang.prototype.showStatus = function() {
    if(this.isUpdated == 0){
      return 'Live Data'
    }else{
      return 'Data Recording'
    }
  }
  return TempatBarang;
};