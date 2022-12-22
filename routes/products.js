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

//display add products page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('products/add', {
        prod_nombre: '',
        prod_codigo: '',
        prod_unidad_precio:''   
   })
})

//add a new products
 router.post('/add', function(req, res, next) {    

    let prod_nombre = req.body.prod_nombre;
    let prod_codigo = req.body.prod_codigo;
    let prod_unidad_precio = req.body.prod_unidad_precio;
    let errors = false;

    if(prod_nombre.length === 0 || prod_codigo.length === 0 || prod_unidad_precio.length === 0) {
    errors = true;

        // set flash message
        req.flash('error', "Casillero Vacio");
        // render to add.ejs with flash message
         res.render('products/add', {
             prod_nombre:prod_nombre,
             prod_codigo:prod_codigo,
             prod_unidad_precio:prod_unidad_precio
       })
    }

     // if no error
     if(!errors) {

var form_data = {
    prod_nombre:prod_nombre,
    prod_codigo:prod_codigo,
    prod_unidad_precio: prod_unidad_precio
         }
        
         // insert query
         dbConn.query('INSERT INTO productos SET ?', form_data, function(err, result) {
             //if(err) throw err
             if (err) {
                 req.flash('error', err)
                 
                 // render to add.ejs
                 res.render('products/add', {
                    prod_nombre: form_data.prod_nombre,
                    prod_codigo: form_data.prod_codigo,
                    prod_unidad_precio: form_data.prod_unidad_precio                    
                 })
             } else {                
                 req.flash('success', 'products successfully added');
                 res.redirect('/products');
             }
         })
     }
})

// display edit products page
router.get('/edit/(:prod_id)', function(req, res, next) {

   let prod_id = req.params.prod_id;
   
  dbConn.query('SELECT * FROM productos WHERE prod_id = ' + prod_id, function(err, rows, fields) {
       if(err) throw err
         
         // if user not found
         if (rows.length <= 0) {
             req.flash('error', 'products not found with prod_id = ' + prod_id)
             res.redirect('/products')
         }
         // if products found
         else {
             // render to edit.ejs
             res.render('products/edit', {
                 title: 'Edit products', 
                 prod_id: rows[0].prod_id,
                 prod_nombre: rows[0].prod_nombre,
                 prod_codigo: rows[0].prod_codigo,
                 prod_unidad_precio: rows[0].prod_unidad_precio
                 
             })
         }
     })
 })
// update products data
 router.post('/update/:prod_id', function(req, res, next) {

     let prod_id = req.params.prod_id;
     let prod_nombre = req.body.prod_nombre;
     let prod_codigo = req.body.prod_codigo;
     let prod_unidad_precio = req.body.prod_unidad_precio;
     
     let errors = false;

     if(prod_nombre.length === 0 || prod_codigo.length === 0 || prod_unidad_precio.length === 0) {
         errors = true;
        
         // set flash message
         req.flash('error', "Casillero Vacio");
         // render to add.ejs with flash message
         res.render('products/edit', {
             prod_id: req.params.prod_id,
             prod_nombre: prod_nombre,
             prod_codigo: prod_codigo,
             prod_unidad_precio: prod_unidad_precio
         })
     }

     // if no error
     if( !errors ) {   
 
         var form_data = {
            prod_nombre: prod_nombre,
            prod_codigo: prod_codigo,
            prod_unidad_precio: prod_unidad_precio
         }
         // update query
         dbConn.query('UPDATE productos SET ? WHERE prod_id = ' + prod_id, form_data, function(err, result) {
             //if(err) throw err
             if (err) {
                 // set flash message
                 req.flash('error', err)
                 // render to edit.ejs
                 res.render('products/edit', {
                     prod_id: req.params.prod_id,
                     prod_nombre: form_data.prod_nombre,
                     prod_codigo: form_data.prod_codigo,
                     prod_unidad_precio: form_data.prod_unidad_precio
                 })
             } else {
                 req.flash('success', 'products successfully updated');
                 res.redirect('/products');
             }
         })
     }
 })
   
 // delete products
 router.get('/delete/(:prod_id)', function(req, res, next) {

     let prod_id = req.params.prod_id;
     
     dbConn.query('DELETE FROM productos WHERE prod_id = ' + prod_id, function(err, result) {
         //if(err) throw err
         if (err) {
             // set flash message
             req.flash('error', err)
             // redirect to products page
             res.redirect('/products')
         } else {
             // set flash message
             req.flash('success', 'products successfully deleted! ID = ' + prod_id)
             // redirect to products page
             res.redirect('/products')
         }
     })
 })

module.exports = router;
