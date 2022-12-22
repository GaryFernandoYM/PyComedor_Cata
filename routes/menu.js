var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
// display menu page
router.get('/', function(req, res, next) {
      
    dbConn.query('SELECT * FROM cronograma_menu ORDER BY crm_id asc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/menu/index.ejs
            res.render('menu',{data:''});   
        } else {
            // render to views/menu/index.ejs
            res.render('menu',{data:rows});
        }
    });
});
// display edit menu page
router.get('/edit/(:crm_id)', function(req, res, next) {

    let crm_id = req.params.crm_id;
    
   dbConn.query('SELECT * FROM cronograma_menu WHERE crm_id = ' + crm_id, function(err, rows, fields) {
        if(err) throw err
          
          // if user not found
          if (rows.length <= 0) {
              req.flash('error', 'menu not found with crm_id = ' + crm_id)
              res.redirect('/menu')
          }
          // if menu found
          else {
              // render to edit.ejs
              res.render('menu/edit', {
                  title: 'Edit menu', 
                  crm_id: rows[0].crm_id,
                  crm_Lunes: rows[0].crm_Lunes,
                  crm_Martes: rows[0].crm_Martes,
                  crm_Miercoles: rows[0].crm_Miercoles,
                  crm_Jueves: rows[0].crm_Jueves,
                  crm_Viernes: rows[0].crm_Viernes
                  
                  
              })
          }
      })
  })
 // update menu data
  router.post('/update/:crm_id', function(req, res, next) {
 
      let crm_id = req.params.crm_id;
      let crm_Lunes = req.body.crm_Lunes;
      let crm_Martes = req.body.crm_Martes;
      let crm_Miercoles = req.body.crm_Miercoles;
      let crm_Jueves = req.body.crm_Jueves;
      let crm_Viernes = req.body.crm_Viernes;
   
      
      let errors = false;
 
      if(crm_Lunes.length === 0 || crm_Martes.length === 0 || crm_Miercoles.length === 0 || crm_Jueves.length === 0|| crm_Viernes.length === 0) {
         errors = true;
         
          // set flash message
          req.flash('error', "Casillero Vacio");
          // render to add.ejs with flash message
          res.render('menu/edit', {
              crm_id: req.params.crm_id,
              crm_Lunes: crm_Lunes,
              crm_Martes: crm_Martes,
              crm_Miercoles: crm_Miercoles,
              crm_Jueves: crm_Jueves,
              crm_Viernes: crm_Viernes
 
          })
      }
 
      // if no error
      if( !errors ) {   
  
          var form_data = {
             crm_Lunes: crm_Lunes,
             crm_Martes: crm_Martes,
             crm_Miercoles: crm_Miercoles,
             crm_Jueves: crm_Jueves,
             crm_Viernes: crm_Viernes
 
          }
          // update query
          dbConn.query('UPDATE cronograma_menu SET ? WHERE crm_id = ' + crm_id, form_data, function(err, result) {
              //if(err) throw err
              if (err) {
                  // set flash message
                  req.flash('error', err)
                  // render to edit.ejs
                  res.render('menu/edit', {
                      crm_id: req.params.crm_id,
                      crm_Lunes: form_data.crm_Lunes,
                      crm_Martes: form_data.crm_Martes,
                      crm_Miercoles: form_data.crm_Miercoles,
                      crm_Jueves: crm_Jueves,
                      crm_Viernes: crm_Viernes
 
                  })
              } else {
                  req.flash('success', 'menu successfully updated');
                  res.redirect('/menu');
              }
          })
      }
  })

module.exports = router;