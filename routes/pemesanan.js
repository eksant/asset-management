const express   = require('express')
const Model     = require('../models')
const Sequelize = require('sequelize')
const Router    = express.Router()
const title     = 'Data Pinjam Barang'

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
  .then(pemesanan => {
    // console.log(pemesanan);
    res.render('./pemesanan', {
      title     : title,
      sidebar   : 'pemesanan',
      pemesanan : pemesanan,
    })
  })
})

Router.get('/add', (req, res) => {
  Model.Barang.findAll()
  .then((barang) => {
    res.render('./pemesanan_add', {
      title       : title,
      sidebar     : 'pemesanan',
      pemesanan   : false,
      barang      : barang,
      errMessage  : null,
    })
  })
})

Router.post('/add', (req, res) => {
  Model.Barang.findById(req.body.barang)
  .then((barang) => {
    if (barang != null) {
      Model.Barang.findOne({
        where: {
          id: req.body.barang
        }
      })
      .then((masterbarang) => {
        if (masterbarang.stock >= req.body.quantity) {
          let objPemesanan = {
            UserId      : res.locals.userSession.id,
            BarangId    : req.body.barang,
            quantity    : req.body.quantity,
            tgl_pinjam  : req.body.tgl_pinjam,
            approval    : 0,
            createdAt   : new Date(),
            updatedAt   : new Date(),
          }
          Model.RequestBarang.create(objPemesanan)
          .then(() => {
            res.redirect('/pemesanan')
          })
          .catch((err) => {
            Model.Barang.findAll()
            .then((barang) => {
              res.render('./pemesanan_add', {
                title       : title,
                sidebar     : 'pemesanan',
                pemesanan   : false,
                barang      : barang,
                errMessage  : err.message,
              })
            })
          })
        } else {
          Model.Barang.findAll()
          .then((barang) => {
            res.render('./pemesanan_add', {
              title       : title,
              sidebar     : 'pemesanan',
              pemesanan   : false,
              barang      : barang,
              errMessage  : `Quantity peminjaman melebihi dari stock barang (${masterbarang.stock}) !!`,
            })
          })
        }
      })
    } else {
      Model.Barang.findAll()
      .then((barang) => {
        res.render('./pemesanan_add', {
          title       : title,
          sidebar     : 'pemesanan',
          pemesanan   : false,
          barang      : barang,
          errMessage  : 'Silahkan pilih barang !!',
        })
      })
    }
  })
  .catch(err => {
    Model.Barang.findAll()
    .then((barang) => {
      res.render('./pemesanan_add', {
        title       : title,
        sidebar     : 'pemesanan',
        pemesanan   : false,
        barang      : barang,
        errMessage  : err.message,
      })
    })
  })
})

Router.get('/edit/:id', (req, res) => {
  Model.RequestBarang.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'BarangId', 'quantity', 'tgl_pinjam', 'approval'],
    order: ['tgl_pinjam'],
    include: [Model.Barang]
  })
  .then(pemesanan => {
    Model.Barang.findAll()
    .then((barang) => {
      res.render('./pemesanan_add', {
        title       : title,
        sidebar     : 'pemesanan',
        pemesanan   : pemesanan,
        barang      : barang,
        errMessage  : null,
      })
    })
  })
})

Router.post('/edit/:id', (req, res) => {
  Model.Barang.findOne({
    where: {
      id: req.body.barang
    }
  })
  .then((masterbarang) => {
    if (masterbarang.stock >= req.body.quantity) {
      let objPemesanan = {
        // id          : req.params.id,
        // UserId      : res.locals.userSession.id,
        BarangId    : req.body.barang,
        quantity    : req.body.quantity,
        tgl_pinjam  : req.body.tgl_pinjam,
        updatedAt   : new Date(),
      }
      Model.RequestBarang.update(objPemesanan, {
        where: {
          id: req.params.id,
        }
      })
      .then(() => {
        res.redirect('/pemesanan')
      })
      .catch(err => {
        Model.RequestBarang.findOne({
          where: {
            id: req.params.id
          },
          attributes: ['id', 'BarangId', 'quantity', 'tgl_pinjam', 'approval'],
          order: ['tgl_pinjam'],
          include: [Model.Barang]
        })
        .then(pemesanan => {
          Model.Barang.findAll()
          .then((barang) => {
            res.render('./pemesanan_add', {
              title       : title,
              sidebar     : 'pemesanan',
              pemesanan   : pemesanan,
              barang      : barang,
              errMessage  : err.message,
            })
          })
        })
      })
    } else {
      Model.RequestBarang.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['id', 'BarangId', 'quantity', 'tgl_pinjam', 'approval'],
        order: ['tgl_pinjam'],
        include: [Model.Barang]
      })
      .then(pemesanan => {
        Model.Barang.findAll()
        .then((barang) => {
          res.render('./pemesanan_add', {
            title       : title,
            sidebar     : 'pemesanan',
            pemesanan   : pemesanan,
            barang      : barang,
            errMessage  : `Quantity peminjaman melebihi dari stock barang (${masterbarang.stock}) !!`,
          })
        })
      })
    }
  })
})

Router.get('/delete/:id', (req, res) => {
  Model.RequestBarang.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/pemesanan')
  })
})

module.exports = Router;
