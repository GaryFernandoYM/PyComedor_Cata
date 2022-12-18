var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
// display menu page
router.get('/', function(req, res, next) {
      
    dbConn.query('SELECT * FROM cronograma_menu ORDER BY crm_id asc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/menu/index.ejs
            res.render('climenu',{data:''});   
        } else {
            // render to views/menu/index.ejs
            res.render('climenu',{data:rows});
        }
    });
});
module.exports = router;