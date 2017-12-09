const express = require('express')
, Router = express.Router()
, Model = require('../models')

Router.get('/', (req, res) => {
  let totalUser = 0
  let totalTempat = 0
  let totalBarang = 0
  let totalAsset = 0

  Model.User.count()
  .then(countUser => {
    Model.Tempat.count()
    .then(countTempat => {
      Model.Barang.count()
      .then(countBarang => {
        Model.TempatBarang.count()
        .then(countAsset => {
          res.render('index', {
            title         : 'Inventory App',
            sidebar       : 'dashboard',
            totalUser     : countUser,
            totalTempat   : countTempat,
            totalBarang   : countBarang,
            totalAsset    : countAsset,
          })
        })
      })
    })
  })
})

module.exports = Router;
