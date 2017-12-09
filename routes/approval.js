const express = require('express')
const Router = express.Router()
const Model = require('../models')

Router.get('/', (req, res) => {
    Model.RequestBarang.findAll({
        attributes: ['id', 'tgl_pinjam', 'quantity', 'approval'],
        order: ['tgl_pinjam'],

        include: [Model.Barang]
    })
        .then(approval => {
            res.render('./approval', {
                title: 'Approval',
                sidebar: 'approval',
                approval: approval,
            })
        })
})


Router.get('/approved/:id', function (req, res) {
    Model.RequestBarang.findOne({
        attributes: ['id'],
        where: {
            id: req.params.id
        }, include: [Model.Barang, Model.User]
    })
        .then(dataRequestBarang => {
            Model.TempatBarang.findAll({
                attributes : ['id','quantity'],
                where: {
                    BarangId: dataRequestBarang.Barang.id,
                    isUpdated: 0
                }, include: [Model.Tempat]
            })
                .then(dataTempatBarang => {
                    console.log(dataTempatBarang)
                    res.render('./approval_approved', {
                        title: 'Approval',
                        sidebar: 'approval',
                        requestBarang: dataRequestBarang,
                        tempatBarang: dataTempatBarang,
                        errMessage: false
                    })
                })
            // 

        })

})

Router.post('/approved/:id', function (req, res) {
    let objSewaBarang = {
        RequestBarangId: req.params.id,
        status_pinjam: 0,
        status_barang: 0,
        tgl_kembali: new Date(req.body.tgl_kembali),
        createdAt: new Date(),
        updatedAt: new Date()
    }
    Promise.all([
        Model.RequestBarang.findOne({
            attributes : ['id', 'BarangId','quantity'],
            where : {
                id : req.params.id
            }
        }),
        Model.TempatBarang.findOne({
            where : {
                id : req.body.tempat
            }
        })
    ]).then(function ([
        dataRequestBarang,
        dataTempatBarang
    ]){
        Promise.all([
            Model.TempatBarang.update({
                isUpdated: 1,
                updatedAt: new Date()
            }, {
                    where: {
                        id: req.body.tempat
                    }
                }),
            Model.TempatBarang.create({
                BarangId : dataRequestBarang.BarangId,
                TempatId : dataTempatBarang.TempatId,
                quantity : dataTempatBarang.quantity - dataRequestBarang.quantity,
                createdAt : new Date(),
                updatedAt : new Date(),
                isUpdated : 0
            }),
            Model.SewaBarang.create(objSewaBarang),
            Model.RequestBarang.update({
                approval : 1
            },{
                where : {
                    id : dataRequestBarang.id
                }
            })
        ]).then(function (){
            res.redirect('/approval')
        })
    })
})

Router.get('/reject/:id', function (req, res) {
    Model.RequestBarang.update({
        approval : 3
    },{
        where : {
            id : req.params.id
        }
    }).then(function () {
        res.redirect('/approval')
    })
    
})

module.exports = Router;

