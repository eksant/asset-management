const express = require('express')
const Router = express.Router()
const Model = require('../models')
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

Router.get('/', (req, res) => {
    Model.TempatBarang.findAll({
        attributes: ['id', 'quantity'],
        include: [Model.Barang, Model.Tempat],
        where: {
            isUpdated: 0
        }
    })
        .then(result => {
            res.render('tempatbarang', {
                tempatbarang: result,
                title: 'Assets',
                sidebar: 'asset'
            })
        })
})

Router.get('/add', (req, res) => {
    Model.Tempat.findAll({
        where: {
            id: { [Op.ne]: 1 }
        },
        order: [['nama_tempat', 'ASC']]
    })
        .then(dataTempat => {
            Model.Barang.findAll({
                order: [['nama_barang', 'ASC']]
            })
                .then(dataBarang => {
                    res.render('tempatbarang_add', {
                        tempatbarang : false,
                        tempat: dataTempat,
                        barang: dataBarang,
                        errMessage: false,
                        title: 'Asset',
                        sidebar: 'asset'
                    })
                })
        })

})

Router.post('/add', function (req, res) {
    var objTempatBarang = {
        BarangId: req.body.barang,
        TempatId: req.body.tempat,
        quantity: req.body.quantity,
        createdAt: new Date(),
        updatedAt: new Date(),
        isUpdated: 0
    }
    Model.TempatBarang.findOne({
        where: {
            TempatId: 1,
            BarangId: req.body.barang,
            isUpdated: 0
        }
    })
        .then(function (dataGudang) {
            if (dataGudang.quantity >= req.body.quantity) {
                Model.TempatBarang.update({ isUpdated: 1 }, {
                    where: {
                        TempatId: 1,
                        BarangId: req.body.barang,
                        isUpdated: 0
                    }
                })
                    .then(function () {
                        var newObjTempatGudang = {
                            BarangId: req.body.barang,
                            TempatId: 1,
                            quantity: dataGudang.quantity - req.body.quantity,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            isUpdated: 0
                        }
                        Model.TempatBarang.bulkCreate([objTempatBarang, newObjTempatGudang])
                            .then(function () {
                                res.redirect('/tempatbarang')
                            })
                    })
            } else {
                Model.Tempat.findAll({
                    order: [['nama_tempat', 'ASC']]
                })
                    .then(dataTempat => {
                        Model.Barang.findAll({
                            order: [['nama_barang', 'ASC']]
                        })
                            .then(dataBarang => {

                                res.render('tempatbarang_add', {
                                    tempat: dataTempat,
                                    barang: dataBarang,
                                    errMessage: 'Quantity lebih banyak dari Stock',
                                    title: 'Asset',
                                    sidebar: 'asset'
                                })
                            })
                    })
            }
        })
})

Router.get('/edit/:id', (req, res) => {
    Model.TempatBarang.findOne({
        attributes : ['id','quantity'],
        where: {
            id: req.params.id,
            isUpdated: 0
        },
        include: [Model.Barang, Model.Tempat]
    })
        .then(result => {
            res.render('tempatbarang_add', {
                tempatbarang: result,
                tempat: false,
                barang: false,
                errMessage: false,
                title: 'Barang',
                sidebar: 'asset'
            })
        })
})

Router.post('/edit/:id', function (req, res) {
    let quantityEdit = Number(req.body.quantity)
    Model.TempatBarang.findOne({
        where : {
            id : req.params.id
        }
    }).then(function (dataTempatBarang) {
        Model.TempatBarang.findOne({
            attributes : ['id','quantity'],
            where : {
                BarangId : dataTempatBarang.BarangId,
                TempatId : 1,
                isUpdated : 0
            }
        }).then(function (dataGudangBarang) {
            let quantityNow = dataGudangBarang.quantity + dataTempatBarang.quantity
            if (quantityNow >= quantityEdit) {
                let objTempatBarang = {
                    quantity: quantityEdit,
                    updatedAt: new Date()
                }
                Model.TempatBarang.update({
                    quantity: quantityNow - quantityEdit
                }, {
                        where: {
                            id: dataGudangBarang.id
                        }
                    })
                    .then(function () {
                        Model.TempatBarang.update(objTempatBarang, {
                            where: { id: req.params.id }
                        })
                            .then(() => {
                                res.redirect('/tempatbarang')
                            })
                            .catch(function(err) {
                                Model.TempatBarang.findOne({
                                    where: {
                                        id: req.params.id,
                                        isUpdated: 0
                                    },
                                    include: [Model.Barang, Model.Tempat]
                                })
                                    .then(catchResult => {
                                        res.render('tempatbarang_add', {
                                            tempatbarang: catchResult,
                                            tempat: false,
                                            barang: false,
                                            errMessage: 'Salah input',
                                            title: 'Barang',
                                            sidebar: 'asset'
                                        })
                                    })
                            })
                    })
            }else{
                Model.TempatBarang.findOne({
                    attributes : ['id', 'quantity'],
                    where: {
                        id: req.params.id,
                        isUpdated: 0
                    },
                    include: [Model.Barang, Model.Tempat]
                })
                    .then(function(barangBack) {
                        console.log('------------------>',barangBack)
                        res.render('tempatbarang_add', {
                            tempatbarang: barangBack,
                            tempat: false,
                            barang: false,
                            errMessage: 'Quantity Lebih dari stock',
                            title: 'Barang',
                            sidebar: 'asset'
                        })
                    })
            }
        })

    })
})

Router.get('/delete/:id', (req, res) => {
    Model.TempatBarang.findOne({
        where : {
            id : req.params.id
        }
    }).then(function (tempatBarang){
        Model.TempatBarang.findOne({
            attributes : ['id','quantity'],
            where : {
                BarangId : tempatBarang.BarangId,
                TempatId : 1,
                isUpdated : 0
            }
        }).then(function(quantityGudang){
            Model.TempatBarang.update({quantity : tempatBarang.quantity + quantityGudang.quantity},{
                where :{
                    id : quantityGudang.id,
                }
            }).then(function () {
                Model.TempatBarang.update({isUpdated:1},{
                    where :{
                        id : req.params.id
                    }
                }).then(() =>{
                    res.redirect('/tempatbarang')
                })
            })
        })
    })
})


module.exports = Router;
