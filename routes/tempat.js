const express   = require('express')
const Model     = require('../models')
const Sequelize = require('sequelize')
const Router    = express.Router()
const title     = 'Data Tempat'

Router.get('/', (req, res) => {
  Model.Tempat.findAll({order: ['nama_tempat']})
  .then(tempat => {
    res.render('./tempat', {
      title   : title,
      sidebar : 'tempat',
      tempat  : tempat,
    })
  })
})

Router.get('/add', (req, res) => {
  res.render('./tempat_add', {
    title       : title,
    sidebar     : 'tempat',
    tempat      : false,
    errMessage  : null,
  })
})

Router.post('/add', (req, res) => {
  let objTempat = {
    nama_tempat : req.body.nama_tempat,
    deskripsi   : req.body.deskripsi,
    createdAt   : new Date(),
    updatedAt   : new Date(),
  }
  Model.Tempat.create(objTempat)
  .then(() => {
    res.redirect('/tempat')
  })
  .catch(err => {
    res.render('./tempat_add', {
      title       : title,
      sidebar     : 'tempat',
      tempat      : false,
      errMessage  : err.message,
    })
  })
})

Router.get('/edit/:id', (req, res) => {
  Model.Tempat.findById(req.params.id)
  .then(tempat => {
    res.render('./tempat_add', {
      title       : title,
      sidebar     : 'tempat',
      tempat      : tempat,
      errMessage  : null,
    })
  })
})

Router.post('/edit/:id', (req, res) => {
  let objTempat = {
    id          : req.params.id,
    nama_tempat : req.body.nama_tempat,
    deskripsi   : req.body.deskripsi,
    updatedAt   : new Date(),
  }
  Model.Tempat.update(objTempat, {
    where: {
      id: req.params.id,
    }
  })
  .then(() => {
    res.redirect('/tempat')
  })
  .catch(err => {
    Model.Tempat.findById(req.params.id)
    .then(tempat => {
      res.render('./tempat_add', {
        title       : title,
        sidebar     : 'tempat',
        tempat      : tempat,
        errMessage  : err.message,
      })
    })
  })
})

Router.get('/delete/:id', (req, res) => {
  Model.Tempat.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/tempat')
  })
})

module.exports = Router;
