'use strict';
module.exports = (sequelize, DataTypes) => {
  var RequestBarang = sequelize.define('RequestBarang', {
    UserId: DataTypes.INTEGER,
    BarangId: {
      type: DataTypes.INTEGER,
      customValidation: function(value, next) {
        if (value == '0' || value == 0) {
          next('Silahkan pilih barang !!')
        } else {
          next()
        }
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric : {
          msg : 'Data yang di input bukan angka (0-9) !!'
        },
        customValidation: function(value, next) {
          if (value == '' || value == '0' || value == 0) {
            next('Silahkan masukkan jumlah barang !!')
          } else {
            next()
          }
        },
      }
    },
    tgl_pinjam: {
      type: DataTypes.DATE,
      validate: {
        customValidation: function(value, next) {
          let now = new Date()
          let dateNow = new Date(now.getFullYear(), now.getMonth(), now.getDate())
          let dateInput = new Date(value.getFullYear(), value.getMonth(), value.getDate())
          if (dateInput > dateNow) {
            next()
          } else {
            next('Tanggal pinjam tidak boleh diinput tanggal sebelum hari ini !!')
          }
        }
      }
    },
    approval: DataTypes.INTEGER,
    keterangan: DataTypes.STRING
  });

  RequestBarang.associate = function (models) {
    RequestBarang.belongsTo(models.Barang)
    RequestBarang.belongsTo(models.User)
  }

  return RequestBarang;
};
