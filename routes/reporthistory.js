const express = require('express')
const Router = express.Router()
const Model = require('../models')
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

Router.get('/', (req, res) => {
    Model.TempatBarang.findAll({
        attributes: ['id', 'quantity','isUpdated','updatedAt'],
        include: [Model.Barang, Model.Tempat]
    })
        .then(result => {
            
            res.render('reporthistory', {
                reporthistory: result,
                title: 'Report History',
                sidebar: 'report_history'
            })
        })
})

Router.get('/filtering', (req, res) =>{
    Model.Barang.findAll().then(function (result) {
        res.render('filtering_report_barang', {
            barang : result,
            title : 'Filtering Report',
            sidebar : 'report_history',
            errMessage : false
        })
    })
    
})



module.exports = Router;