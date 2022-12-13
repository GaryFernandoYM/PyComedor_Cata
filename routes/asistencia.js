var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
router.get('/', function(req, res, next) {
      
    dbConn.query('SELECT * FROM registro_asistencia ORDER BY reg_id asc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/products/index.ejs
            res.render('asistencia',{data:''});   
        } else {
            // render to views/products/index.ejs
            res.render('asistencia',{data:rows});
        }
    });
});