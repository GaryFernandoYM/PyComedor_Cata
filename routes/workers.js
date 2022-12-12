var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
// display workers page
router.get('/', function(req, res, next) {
      
    dbConn.query('SELECT * FROM trabajador ORDER BY tra_id asc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/workers/index.ejs
            res.render('workers',{data:''});   
        } else {
            // render to views/workers/index.ejs
            res.render('workers',{data:rows});
        }
    });
});

//display add workers page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('workers/add', {
        tra_nombre: '',
        tra_ap_paterno: '',
        tra_ap_materno:'',  
        tra_direccion:'', 
        tra_nro_documento:'', 
        tra_telefono:''
   })
})

//add a new workers
 router.post('/add', function(req, res, next) {    

    let tra_nombre = req.body.tra_nombre;
    let tra_ap_paterno = req.body.tra_ap_paterno;
    let tra_ap_materno = req.body.tra_ap_materno;
    let tra_direccion = req.body.tra_direccion;
    let tra_nro_documento = req.body.tra_nro_documento;
    let tra_telefono = req.body.tra_telefono;

    let errors = false;

    if(tra_nombre.length === 0 || tra_ap_paterno.length === 0 || tra_ap_materno.length === 0 || tra_direccion.length === 0|| tra_nro_documento.length === 0|| tra_telefono.length === 0) {
    errors = true;

        // set flash message
        req.flash('error', "Please enter name and author");
        // render to add.ejs with flash message
         res.render('workers/add', {
             tra_nombre:tra_nombre,
             tra_ap_paterno:tra_ap_paterno,
             tra_ap_materno:tra_ap_materno,
             tra_direccion:tra_direccion,
             tra_nro_documento:tra_nro_documento,
             tra_telefono:tra_telefono
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
    tra_telefono:tra_telefono
         }
        
         // insert query
         dbConn.query('INSERT INTO trabajador SET ?', form_data, function(err, result) {
             //if(err) throw err
             if (err) {
                 req.flash('error', err)
                 
                 // render to add.ejs
                 res.render('workers/add', {
                    tra_nombre: form_data.tra_nombre,
                    tra_ap_paterno: form_data.tra_ap_paterno,
                    tra_ap_materno: form_data.tra_ap_materno,
                    tra_direccion: form_data.tra_direccion, 
                    tra_nro_documento: form_data.tra_nro_documento, 
                    tra_telefono: form_data.tra_telefono                 
                 })
             } else {                
                 req.flash('success', 'workers successfully added');
                 res.redirect('/workers');
             }
         })
     }
})

// display edit workers page
router.get('/edit/(:tra_id)', function(req, res, next) {

   let tra_id = req.params.tra_id;
   
  dbConn.query('SELECT * FROM trabajador WHERE tra_id = ' + tra_id, function(err, rows, fields) {
       if(err) throw err
         
         // if user not found
         if (rows.length <= 0) {
             req.flash('error', 'workers not found with tra_id = ' + tra_id)
             res.redirect('/workers')
         }
         // if workers found
         else {
             // render to edit.ejs
             res.render('workers/edit', {
                 title: 'Edit workers', 
                 tra_id: rows[0].tra_id,
                 tra_nombre: rows[0].tra_nombre,
                 tra_ap_paterno: rows[0].tra_ap_paterno,
                 tra_ap_materno: rows[0].tra_ap_materno,
                 tra_direccion: rows[0].tra_direccion,
                 tra_nro_documento: rows[0].tra_nro_documento,
                 tra_telefono: rows[0].tra_telefono
                 
             })
         }
     })
 })
// update workers data
 router.post('/update/:tra_id', function(req, res, next) {

     let tra_id = req.params.tra_id;
     let tra_nombre = req.body.tra_nombre;
     let tra_ap_paterno = req.body.tra_ap_paterno;
     let tra_ap_materno = req.body.tra_ap_materno;
     let tra_direccion = req.body.tra_direccion;
     let tra_nro_documento = req.body.tra_nro_documento;
     let tra_telefono = req.body.tra_telefono;
     
     let errors = false;

     if(tra_nombre.length === 0 || tra_ap_paterno.length === 0 || tra_ap_materno.length === 0 || tra_direccion.length === 0|| tra_nro_documento.length === 0|| tra_telefono.length === 0) {
        errors = true;
        
         // set flash message
         req.flash('error', "Please enter name and author");
         // render to add.ejs with flash message
         res.render('workers/edit', {
             tra_id: req.params.tra_id,
             tra_nombre: tra_nombre,
             tra_ap_paterno: tra_ap_paterno,
             tra_ap_materno: tra_ap_materno,
             tra_direccion: tra_direccion,
             tra_nro_documento: tra_nro_documento,
             tra_telefono: tra_telefono
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
            tra_telefono: tra_telefono
         }
         // update query
         dbConn.query('UPDATE trabajador SET ? WHERE tra_id = ' + tra_id, form_data, function(err, result) {
             //if(err) throw err
             if (err) {
                 // set flash message
                 req.flash('error', err)
                 // render to edit.ejs
                 res.render('workers/edit', {
                     tra_id: req.params.tra_id,
                     tra_nombre: form_data.tra_nombre,
                     tra_ap_paterno: form_data.tra_ap_paterno,
                     tra_ap_materno: form_data.tra_ap_materno,
                     tra_direccion: tra_direccion,
                     tra_nro_documento: tra_nro_documento,
                     tra_telefono: tra_telefono
                 })
             } else {
                 req.flash('success', 'workers successfully updated');
                 res.redirect('/workers');
             }
         })
     }
 })
   
 // delete workers
 router.get('/delete/(:tra_id)', function(req, res, next) {

     let tra_id = req.params.tra_id;
     
     dbConn.query('DELETE FROM trabajador WHERE tra_id = ' + tra_id, function(err, result) {
         //if(err) throw err
         if (err) {
             // set flash message
             req.flash('error', err)
             // redirect to workers page
             res.redirect('/workers')
         } else {
             // set flash message
             req.flash('success', 'workers successfully deleted! ID = ' + tra_id)
             // redirect to workers page
             res.redirect('/workers')
         }
     })
 })

module.exports = router;