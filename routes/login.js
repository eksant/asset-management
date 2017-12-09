const express   = require('express')
const Model     = require('../models')
const Sequelize = require('sequelize')
const Router    = express.Router()
const title     = 'Assets Management'

Router.get('/', (req, res) => {
  res.render('./login', {
    title       : title,
    errMessage  : null,
  })
})

Router.post('/checkUser', (req, res) => {
  Model.User.findOne({
    where: {
      email: req.body.email,
    }
  })
  .then((user) => {
    if (user == null) {
      res.render('./login', {
        title       : title,
        errMessage  : 'Email atau Password tidak sesuai !!',
      })
    } else {
      user.check_password(req.body.password, (isMatch) => {
        if (isMatch) {
          let objUser = {
            last_login: new Date(),
          }
          Model.User.update(objUser, {
            where: {
              id: user.id
            }
          })
          .then(() => {
            req.session.isLogin = true
            req.session.user = user
            res.redirect('/')
          })
        } else {
          req.session.isLogin = false //>>> ganti false
          req.session.user = undefined //>> ganti undefines
          res.render('./login', {
            title       : title,
            errMessage  : 'Email atau Password tidak sesuai !!',
          })
        }
      })
    }
  })
  .catch((err) => {
    res.render('./login', {
      title       : title,
      errMessage  : err.message,
    })
  })
})

module.exports = Router;
