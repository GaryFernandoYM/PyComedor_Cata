var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
// display crudusers page
router.get('/', function(req, res, next) {
      
    dbConn.query('SELECT * FROM usuarios ORDER BY id asc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/crudusers/index.ejs
            res.render('crudusers',{data:''});   
        } else {
            // render to views/crudusers/index.ejs
            res.render('crudusers',{data:rows});
        }
    });
});

//display add crudusers page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('crudusers/add', {
        tra_nombre: '',
        tra_ap_paterno: '',
        tra_ap_materno:'',  
        tra_direccion:'', 
        tra_nro_documento:'', 
        tra_telefono:'',
        cargo:''
        
   })
})

//add a new crudusers
 router.post('/add', function(req, res, next) {    

    let tra_nombre = req.body.tra_nombre;
    let tra_ap_paterno = req.body.tra_ap_paterno;
    let tra_ap_materno = req.body.tra_ap_materno;
    let tra_direccion = req.body.tra_direccion;
    let tra_nro_documento = req.body.tra_nro_documento;
    let tra_telefono = req.body.tra_telefono;
    let cargo = req.body.cargo;

    let errors = false;

    if(tra_nombre.length === 0 || tra_ap_paterno.length === 0 || tra_ap_materno.length === 0 || tra_direccion.length === 0|| tra_nro_documento.length === 0|| tra_telefono.length === 0|| cargo.length === 0) {
    errors = true;

        // set flash message
        req.flash('error', "Please enter name and author");
        // render to add.ejs with flash message
         res.render('crudusers/add', {
             tra_nombre:tra_nombre,
             tra_ap_paterno:tra_ap_paterno,
             tra_ap_materno:tra_ap_materno,
             tra_direccion:tra_direccion,
             tra_nro_documento:tra_nro_documento,
             tra_telefono:tra_telefono,
             cargo:cargo
       })
    }

     // if no error
     if(!errors) {

var form_data = {
    tra_nombre:tra_nombre,
    tra_ap_paterno:tra_ap_paterno,
    tra_ap_materno:tra_ap_materno,
    tra_direccion:tra_direccion,
    tra_nro_documento:tra_nro_documento,
    tra_telefono:tra_telefono,
    cargo:cargo
         }
        
         // insert query
         dbConn.query('INSERT INTO trabajador SET ?', form_data, function(err, result) {
             //if(err) throw err
             if (err) {
                 req.flash('error', err)
                 
                 // render to add.ejs
                 res.render('crudusers/add', {
                    tra_nombre: form_data.tra_nombre,
                    tra_ap_paterno: form_data.tra_ap_paterno,
                    tra_ap_materno: form_data.tra_ap_materno,
                    tra_direccion: form_data.tra_direccion, 
                    tra_nro_documento: form_data.tra_nro_documento, 
                    tra_telefono: form_data.tra_telefono, 
                    cargo: form_data.cargo                 
                
                 })
             } else {                
                 req.flash('success', 'crudusers successfully added');
                 res.redirect('/crudusers');
             }
         })
     }
})

// display edit crudusers page
router.get('/edit/(:tra_id)', function(req, res, next) {

   let tra_id = req.params.tra_id;
   
  dbConn.query('SELECT * FROM trabajador WHERE tra_id = ' + tra_id, function(err, rows, fields) {
       if(err) throw err
         
         // if user not found
         if (rows.length <= 0) {
             req.flash('error', 'crudusers not found with tra_id = ' + tra_id)
             res.redirect('/crudusers')
         }
         // if crudusers found
         else {
             // render to edit.ejs
             res.render('crudusers/edit', {
                 title: 'Edit crudusers', 
                 tra_id: rows[0].tra_id,
                 tra_nombre: rows[0].tra_nombre,
                 tra_ap_paterno: rows[0].tra_ap_paterno,
                 tra_ap_materno: rows[0].tra_ap_materno,
                 tra_direccion: rows[0].tra_direccion,
                 tra_nro_documento: rows[0].tra_nro_documento,
                 tra_telefono: rows[0].tra_telefono,
                 cargo: rows[0].cargo
                 
             })
         }
     })
 })
// update crudusers data
 router.post('/update/:tra_id', function(req, res, next) {

     let tra_id = req.params.tra_id;
     let tra_nombre = req.body.tra_nombre;
     let tra_ap_paterno = req.body.tra_ap_paterno;
     let tra_ap_materno = req.body.tra_ap_materno;
     let tra_direccion = req.body.tra_direccion;
     let tra_nro_documento = req.body.tra_nro_documento;
     let tra_telefono = req.body.tra_telefono;
     let cargo = req.body.cargo;
     
     let errors = false;

     if(tra_nombre.length === 0 || tra_ap_paterno.length === 0 || tra_ap_materno.length === 0 || tra_direccion.length === 0|| tra_nro_documento.length === 0|| tra_telefono.length === 0|| cargo.length === 0) {
        errors = true;
        
         // set flash message
         req.flash('error', "Please enter name and author");
         // render to add.ejs with flash message
         res.render('crudusers/edit', {
             tra_id: req.params.tra_id,
             tra_nombre: tra_nombre,
             tra_ap_paterno: tra_ap_paterno,
             tra_ap_materno: tra_ap_materno,
             tra_direccion: tra_direccion,
             tra_nro_documento: tra_nro_documento,
             tra_telefono: tra_telefono,
             cargo: cargo

         })
     }

     // if no error
     if( !errors ) {   
 
         var form_data = {
            tra_nombre: tra_nombre,
            tra_ap_paterno: tra_ap_paterno,
            tra_ap_materno: tra_ap_materno,
            tra_direccion: tra_direccion,
            tra_nro_documento: tra_nro_documento,
            tra_telefono: tra_telefono,
            cargo: cargo

         }
         // update query
         dbConn.query('UPDATE trabajador SET ? WHERE tra_id = ' + tra_id, form_data, function(err, result) {
             //if(err) throw err
             if (err) {
                 // set flash message
                 req.flash('error', err)
                 // render to edit.ejs
                 res.render('crudusers/edit', {
                     tra_id: req.params.tra_id,
                     tra_nombre: form_data.tra_nombre,
                     tra_ap_paterno: form_data.tra_ap_paterno,
                     tra_ap_materno: form_data.tra_ap_materno,
                     tra_direccion: tra_direccion,
                     tra_nro_documento: tra_nro_documento,
                     tra_telefono: tra_telefono,
                     cargo: cargo

                 })
             } else {
                 req.flash('success', 'crudusers successfully updated');
                 res.redirect('/crudusers');
             }
         })
     }
 })
   
 // delete crudusers
 router.get('/delete/(:tra_id)', function(req, res, next) {

     let tra_id = req.params.tra_id;
     
     dbConn.query('DELETE FROM trabajador WHERE tra_id = ' + tra_id, function(err, result) {
         //if(err) throw err
         if (err) {
             // set flash message
             req.flash('error', err)
             // redirect to crudusers page
             res.redirect('/crudusers')
         } else {
             // set flash message
             req.flash('success', 'crudusers successfully deleted! ID = ' + tra_id)
             // redirect to crudusers page
             res.redirect('/crudusers')
         }
     })
 })

module.exports = router;