'use strict';
const Op      = require('sequelize').Op
const bcrypt  = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: {
          args: true,
          msg: 'Email harus di isi !!'
        },
        isUnique: function(value, next) {
          User.findAll({
            where:{
              email: value,
              id: { [Op.ne]: this.id, }
            }
          })
          .then(function(user) {
            if (user.length == 0) {
              next()
            } else {
              next('Email sudah terdaftar !')
            }
          })
          .catch(function(err) {
            next(err)
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password harus di isi !!'
        },
        len: {
          args: [6, 255],
          msg: 'Password minimal 6 karakter !!'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        customValidation: function(value, next) {
          if (value == 0) {
            next('Silahkan pilih role !!')
          } else {
            next()
          }
        }
      }
    },
    last_login: DataTypes.DATE
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        return bcrypt.hash(user.password, 10)
        .then((hash) => {
          user.password = hash
        })
      },
      beforeUpdate: (user, options) => {
        return bcrypt.hash(user.password, 10)
        .then((hash) => {
          user.password = hash
        })
      }
    },
    instanceMethods: {
      comparePassword: function (userPassword, callback) {
        bcrypt.compare(userPassword, this.password)
        .then((isMatch) => {
          callback(isMatch)
        })
      }
    }
  });

  User.prototype.check_password = function (userPassword, callback) {
    bcrypt.compare(userPassword, this.password)
    .then((isMatch) => {
      callback(isMatch)
    })
    .catch((err) => {
      callback(err)
    })
  }

  User.associate = function(models) {
    User.belongsToMany(models.Barang, {
      through: 'RequestBarang'
    })
    User.hasMany(models.RequestBarang)
  }

  return User;
};
