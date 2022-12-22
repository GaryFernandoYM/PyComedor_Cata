var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
// display sales page

router.get('/', function(req, res, next) {
      
    dbConn.query('SELECT * FROM venta_detalle_boleta , productos ORDER BY vta_detalle_id asc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/sales/index.ejs
            res.render('sales',{data:''});   
        } else {
            // render to views/sales/index.ejs
            res.render('sales',{data:rows});
        }
    });
});
//display index sales page
router.get('/index', function(req, res, next) {    
    // render to index.ejs
    res.render('sales/index', {
        vta_detalle_prod_id: '',
        vta_detalle_cantidad: '',
        vta_detalle_precio_unit:'',  
        vta_detalle_importe:'', 
        vta_detalle_total:''
        
   })
})

//index a new sales
 router.post('/index', function(req, res, next) {    

    let vta_detalle_prod_id = req.body.vta_detalle_prod_id;
    let vta_detalle_cantidad = req.body.vta_detalle_cantidad;
    let vta_detalle_precio_unit = req.body.vta_detalle_precio_unit;
    let vta_detalle_importe = req.body.vta_detalle_importe;
    let vta_detalle_total = req.body.vta_detalle_total;
    

    if(vta_detalle_prod_id.length === 0 || vta_detalle_cantidad.length === 0 || vta_detalle_precio_unit.length === 0 || vta_detalle_importe.length === 0|| vta_detalle_total.length === 0) {
    errors = true;

        // set flash message
        req.flash('error', "Casillero Vacio");
        // render to index.ejs with flash message
         res.render('sales/index', {
             vta_detalle_prod_id:vta_detalle_prod_id,
             vta_detalle_cantidad:vta_detalle_cantidad,
             vta_detalle_precio_unit:vta_detalle_precio_unit,
             vta_detalle_importe:vta_detalle_importe,
             vta_detalle_total:vta_detalle_total,      
            
            })
    }

     // if no error
     if(!errors) {

var form_data = {
    vta_detalle_prod_id:vta_detalle_prod_id,
    vta_detalle_cantidad:vta_detalle_cantidad,
    vta_detalle_precio_unit:vta_detalle_precio_unit,
    vta_detalle_importe:vta_detalle_importe,
    vta_detalle_total:vta_detalle_total}
        
         // insert query
         dbConn.query('INSERT INTO venta_detalle_boleta SET ?', form_data, function(err, result) {
             //if(err) throw err
             if (err) {
                 req.flash('error', err)
                 
                 // render to index.ejs
                 res.render('sales/index', {
                    vta_detalle_prod_id: form_data.vta_detalle_prod_id,
                    vta_detalle_cantidad: form_data.vta_detalle_cantidad,
                    vta_detalle_precio_unit: form_data.vta_detalle_precio_unit,
                    vta_detalle_importe: form_data.vta_detalle_importe, 
                    vta_detalle_total: form_data.vta_detalle_total       
                
                 })
             } else {                
                 req.flash('success', 'sales successfully indexed');
                 res.redirect('/sales');
             }
         })
     }
})

// display edit sales page
router.get('/edit/(:tra_id)', function(req, res, next) {

   let tra_id = req.params.tra_id;
   
  dbConn.query('SELECT * FROM venta_detalle_boleta WHERE tra_id = ' + tra_id, function(err, rows, fields) {
       if(err) throw err
         
         // if user not found
         if (rows.length <= 0) {
             req.flash('error', 'sales not found with tra_id = ' + tra_id)
             res.redirect('/sales')
         }
         // if sales found
         else {
             // render to edit.ejs
             res.render('sales/edit', {
                 title: 'Edit sales', 
                 tra_id: rows[0].tra_id,
                 vta_detalle_prod_id: rows[0].vta_detalle_prod_id,
                 vta_detalle_cantidad: rows[0].vta_detalle_cantidad,
                 vta_detalle_precio_unit: rows[0].vta_detalle_precio_unit,
                 vta_detalle_importe: rows[0].vta_detalle_importe,
                 vta_detalle_total: rows[0].vta_detalle_total              
             })
         }
     })
 })
// update sales data
 router.post('/update/:tra_id', function(req, res, next) {

     let tra_id = req.params.tra_id;
     let vta_detalle_prod_id = req.body.vta_detalle_prod_id;
     let vta_detalle_cantidad = req.body.vta_detalle_cantidad;
     let vta_detalle_precio_unit = req.body.vta_detalle_precio_unit;
     let vta_detalle_importe = req.body.vta_detalle_importe;
     let vta_detalle_total = req.body.vta_detalle_total;
     let  = req.b    
     let errors = false;

     if(vta_detalle_prod_id.length === 0 || vta_detalle_cantidad.length === 0 || vta_detalle_precio_unit.length === 0 || vta_detalle_importe.length === 0|| vta_detalle_total.length === 0) {
        errors = true;
        
         // set flash message
         req.flash('error', "Casillero Vacio");
         // render to index.ejs with flash message
         res.render('sales/edit', {
             tra_id: req.params.tra_id,
             vta_detalle_prod_id: vta_detalle_prod_id,
             vta_detalle_cantidad: vta_detalle_cantidad,
             vta_detalle_precio_unit: vta_detalle_precio_unit,
             vta_detalle_importe: vta_detalle_importe,
             vta_detalle_total: vta_detalle_total,
        })
     }

     // if no error
     if( !errors ) {   
 
         var form_data = {
            vta_detalle_prod_id: vta_detalle_prod_id,
            vta_detalle_cantidad: vta_detalle_cantidad,
            vta_detalle_precio_unit: vta_detalle_precio_unit,
            vta_detalle_importe: vta_detalle_importe,
            vta_detalle_total: vta_detalle_total        }
         // update query
         dbConn.query('UPDATE venta_detalle_boleta SET ? WHERE tra_id = ' + tra_id, form_data, function(err, result) {
             //if(err) throw err
             if (err) {
                 // set flash message
                 req.flash('error', err)
                 // render to edit.ejs
                 res.render('sales/edit', {
                     tra_id: req.params.tra_id,
                     vta_detalle_prod_id: form_data.vta_detalle_prod_id,
                     vta_detalle_cantidad: form_data.vta_detalle_cantidad,
                     vta_detalle_precio_unit: form_data.vta_detalle_precio_unit,
                     vta_detalle_importe: vta_detalle_importe,
                     vta_detalle_total: vta_detalle_total
                                })
             } else {
                 req.flash('success', 'sales successfully updated');
                 res.redirect('/sales');
             }
         })
     }
 })
   
 // delete sales
 router.get('/delete/(:tra_id)', function(req, res, next) {

     let tra_id = req.params.tra_id;
     
     dbConn.query('DELETE FROM venta_detalle_boleta WHERE tra_id = ' + tra_id, function(err, result) {
         //if(err) throw err
         if (err) {
             // set flash message
             req.flash('error', err)
             // redirect to sales page
             res.redirect('/sales')
         } else {
             // set flash message
             req.flash('success', 'sales successfully deleted! ID = ' + tra_id)
             // redirect to sales page
             res.redirect('/sales')
         }
     })
 })
module.exports = router;