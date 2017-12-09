const express   = require('express')
const Model     = require('../models')
const Sequelize = require('sequelize')
const Router    = express.Router()
const title     = 'Laporan Peminjaman Barang'

Router.get('/', (req, res) => {
  var filterQuery

  if (res.locals.userSession.role == 'admin') {
    filterQuery = {
      attributes: ['id', 'quantity', 'tgl_pinjam', 'approval'],
      order: ['tgl_pinjam'],
      include: [Model.Barang, Model.User]
    }
  } else {
    filterQuery = {
      where: {
        UserId: res.locals.userSession.id
      },
      attributes: ['id', 'UserId', 'BarangId', 'quantity', 'tgl_pinjam', 'approval'],
      order: ['tgl_pinjam'],
      include: [Model.Barang, Model.User]
    }
  }
  Model.RequestBarang.findAll(filterQuery)
  .then(reqBarang => {
    res.render('./report_pinjam', {
      title     : title,
      sidebar   : 'report_pinjam',
      reqBarang : reqBarang,
    })
  })
})

module.exports = Router;
