const express = require('express')
const Router = express.Router()
const Model = require('../models')

Router.get('/', (req, res) => {
    
    Model.Barang.findAll({ order: [['nama_barang', 'ASC']] })
        .then(result => {
            console.log(result)
            res.render('barang', {
                barang: result,
                errMessage : false,
                title: 'Barang',
                sidebar : 'barang'})
        })
})

Router.get('/add', (req, res) => {
    res.render('barang_add', {
        barang: false,
        errMessage: false,
        title: 'Barang',
        sidebar: 'barang'
    })
})

Router.post('/add', (req, res) =>{
    let objBarang = {
        nama_barang : req.body.nama_barang,
        stock : req.body.stock,
        createdAt : new Date(),
        updatedAt : new Date()
    }
    Model.Barang.create(objBarang)
    .then(() =>{
        
        res.redirect('/barang')
    })
    .catch(err =>{
        res.render('barang_add', {
            barang : false,
            errMessage : err.message,
            title: 'Barang',
            sidebar: 'barang'
        })
    })
})

Router.get('/edit/:id', (req, res) =>{
    Model.Barang.findById(req.params.id)
    .then(result =>{
        res.render('barang_add',{
            barang : result,
            errMessage : false,
            title: 'Barang',
            sidebar: 'barang'
        })
    })
})

Router.post('/edit/:id', function (req, res){
    let stock = Number(req.body.stock)
    let objBarang = {
        nama_barang : req.body.nama_barang,
        stock : stock,
        updatedAt : new Date()
    }
    Model.TempatBarang.findAll({
        attributes : ['id','quantity'],
        where : {
            BarangId : req.params.id
        }
    }).then(function (quantityBarang){
        if(quantityBarang.length == 1){
            if(stock <= quantityBarang[0].quantity){
                Model.TempatBarang.update({
                    nama_barang:req.body.nama_barang,
                    quantity:stock
                },{
                    where :{
                        id : quantityBarang[0].id
                    }
                }).then(function(){
                    Model.Barang.update({
                        nama_barang : req.body.nama_barang,
                        stock : stock
                    },{
                        where : {
                            id : req.params.id
                        }
                    }).then(function () {
                        res.redirect('/barang')
                    })
                })
            }else{
                Model.Barang.findById(req.params.id)
                .then(result =>{
                    res.render('barang_add',{
                        barang : result,
                        errMessage : 'stock lebih banyak daripada quality',
                        title: 'Barang',
                        sidebar: 'barang'
                    })
                })
            }
        }else{
            Model.Barang.findById(req.params.id)
            .then(result =>{
                res.render('barang_add',{
                    barang : result,
                    errMessage : 'Barang sudah ada di ruangan lain',
                    title: 'Barang',
                    sidebar: 'barang'
                })
            })
        }
        
    })
})

Router.get('/delete/:id', function (req, res){
    Model.TempatBarang.findAll({
        attributes : ['id','quantity'],
        where : {
            BarangId : req.params.id
        }
    }).then(function (dataBarang) {
        if(dataBarang.length == 1){
            Model.TempatBarang.destroy({
                where :{
                    id : dataBarang[0].id
                }
            }).then(function(){
                Model.Barang.destroy({
                    where : {
                        id : req.params.id
                    }
                }).then(function () {
                    res.redirect('/barang')
                })
            })
        }else{
            Model.Barang.findAll({ order: [['nama_barang', 'ASC']] })
            .then(result => {
                console.log(result)
                res.render('barang', {
                    barang: result,
                    errMessage : 'Barang telah di distribusi',
                    title: 'Barang',
                    sidebar : 'barang'})
            })
        }
    })
})


module.exports = Router;

