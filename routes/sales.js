var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
// display products page
router.get('/', function(req, res, next) {
      
    dbConn.query('SELECT * FROM productos ORDER BY prod_id asc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/products/index.ejs
            res.render('products',{data:''});   
        } else {
            // render to views/products/index.ejs
            res.render('products',{data:rows});
        }
    });
});