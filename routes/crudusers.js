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
        nombre: '',
        email: '',
        password:'',  
        Cargo:''
        
        
   })
})

//add a new crudusers
 router.post('/add', function(req, res, next) {    

    let nombre = req.body.nombre;
    let email = req.body.email;
    let password = req.body.password;
    let Cargo = req.body.Cargo;
    

    let errors = false;

    if(nombre.length === 0 || email.length === 0 || password.length === 0 || Cargo.length === 0) {
    errors = true;

        // set flash message
        req.flash('error', "Casillero Vacio");
        // render to add.ejs with flash message
         res.render('crudusers/add', {
             nombre:nombre,
             email:email,
             password:password,
             Cargo:Cargo
             
       })
    }

     // if no error
     if(!errors) {

var form_data = {
    nombre:nombre,
    email:email,
    password:password,
    Cargo:Cargo
  
         }
        
         // insert query
         dbConn.query('INSERT INTO usuarios SET ?', form_data, function(err, result) {
             //if(err) throw err
             if (err) {
                 req.flash('error', err)
                 
                 // render to add.ejs
                 res.render('crudusers/add', {
                    nombre: form_data.nombre,
                    email: form_data.email,
                    password: form_data.password,
                    Cargo: form_data.Cargo 
                                   
                
                 })
             } else {                
                 req.flash('success', 'crudusers successfully added');
                 res.redirect('/crudusers');
             }
         })
     }
})

// display edit crudusers page
router.get('/edit/(:id)', function(req, res, next) {

   let id = req.params.id;
   
  dbConn.query('SELECT * FROM usuarios WHERE id = ' + id, function(err, rows, fields) {
       if(err) throw err
         
         // if user not found
         if (rows.length <= 0) {
             req.flash('error', 'crudusers not found with id = ' + id)
             res.redirect('/crudusers')
         }
         // if crudusers found
         else {
             // render to edit.ejs
             res.render('crudusers/edit', {
                 title: 'Edit crudusers', 
                 id: rows[0].id,
                 nombre: rows[0].nombre,
                 email: rows[0].email,
                 password: rows[0].password,
                 Cargo: rows[0].Cargo
             })
         }
     })
 })
// update crudusers data
 router.post('/update/:id', function(req, res, next) {

     let id = req.params.id;
     let nombre = req.body.nombre;
     let email = req.body.email;
     let password = req.body.password;
     let Cargo = req.body.Cargo;
     
     let errors = false;

     if(nombre.length === 0 || email.length === 0 || password.length === 0 || Cargo.length === 0) {
        errors = true;
        
         // set flash message
         req.flash('error', "Casillero Vacio");
         // render to add.ejs with flash message
         res.render('crudusers/edit', {
             id: req.params.id,
             nombre: nombre,
             email: email,
             password: password,
             Cargo: Cargo

         })
     }

     // if no error
     if( !errors ) {   
 
         var form_data = {
            nombre: nombre,
            email: email,
            password: password,
            Cargo: Cargo

         }
         // update query
         dbConn.query('UPDATE usuarios SET ? WHERE id = ' + id, form_data, function(err, result) {
             //if(err) throw err
             if (err) {
                 // set flash message
                 req.flash('error', err)
                 // render to edit.ejs
                 res.render('crudusers/edit', {
                     id: req.params.id,
                     nombre: form_data.nombre,
                     email: form_data.email,
                     password: form_data.password,
                     Cargo: Cargo

                 })
             } else {
                 req.flash('success', 'crudusers successfully updated');
                 res.redirect('/crudusers');
             }
         })
     }
 })
   
 // delete crudusers
 router.get('/delete/(:id)', function(req, res, next) {

     let id = req.params.id;
     
     dbConn.query('DELETE FROM usuarios WHERE id = ' + id, function(err, result) {
         //if(err) throw err
         if (err) {
             // set flash message
             req.flash('error', err)
             // redirect to crudusers page
             res.redirect('/crudusers')
         } else {
             // set flash message
             req.flash('success', 'crudusers successfully deleted! ID = ' + id)
             // redirect to crudusers page
             res.redirect('/crudusers')
         }
     })
 })


// router.get('/search', function(req, res, next) {
//     let nombre = req.params.nombre;
//     let email = req.params.email;
//     let Cargo = req.params.Cargo;
      
//     dbConn.query("SELECT * FROM usuarios where nombre LIKE '% " +nombre+"' ",function(err,rows)     {
 
//         if(err) {
//             req.flash('error', err);
//             // render to views/crudusers/index.ejs
//             res.render('crudusers',{data:''});   
//         } else {
//             // render to views/crudusers/index.ejs
//             res.render('crudusers',{data:rows});
//         }
//     });
// });

module.exports = router;
