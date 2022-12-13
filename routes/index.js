var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/dashboard', function(req, res, next) {
  email=req.body.email;
  password=req.body.password;
  console.log(email);
  dbConn.query("SELECT * FROM usuarios WHERE email='"+email+"' AND password='"+password+"'",function(err,rows){
    if(err){
      req.flash('error',err);
      console.log(err);
    }else{
      if(rows.length){
        console.log(rows);
        req.session.idu=rows[0]["id"];
        req.session.email=rows[0]["email"];
        req.session.loggedin = true;
        res.redirect('/main');
      }else{
        req.flash('error','El usuario no existe...');
        res.redirect('/login');
      }
    }
  });

  
});

router.get('/asistencia', function(req, res, next) {
  res.render('asistencia/asist');
});
router.get('/sales', function(req, res, next) {
  res.render('sales/index');
});


router.get('/main', function(req, res, next) {
   //if(!req.session.loggedin){
   //  res.redirect('/login');
   //}else{
     res.locals.idu=req.session.idu;
     res.locals.email=req.session.email;
     res.locals.loggedin=req.session.loggedin;

     var queries = [
      "SELECT COUNT(idx) as cantidad FROM clientes",
      "SELECT SUM(saldo) as total FROM clientes"
    ];
    
     //dbConn.query('SELECT SUM(saldo) as total FROM clientes',function(err,rows) {
     dbConn.query(queries.join(';'),function(err,rows) {
      //console.log(rows[0].total);
      if(err) throw err;
      //console.log(rows[0][0].cantidad);
      res.render('dashboard',{dataCantidad:rows[0][0].cantidad,dataSaldo:rows[1][0].total});
     });
     
   //}
});

router.get('/api', function(req, res, next) {
  //if(!req.session.idu){
    //res.render('login/index');
  //}else{
    dbConn.query('SELECT marca, COUNT(*) as cantidad FROM clientes GROUP BY marca',function(err,rows)     {
      if(err) {
          req.flash('error', err);  
          console.log(rows);
      } else {
        res.send(JSON.stringify(rows));
        //res.render('login/dashboard',{data:JSON.stringify(rows)});
      }
    });
  //}
});


router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

router.get('/clientes', function(req, res, next) {
  dbConn.query('SELECT * FROM clientes WHERE activo=1',function(err,rows)     {
      if(err) {
          req.flash('error', err);
          // render to views/books/index.ejs
          res.render('clientes/list',{data:''});   
          console.log(rows);
      } else {
          // render to views/books/index.ejs
          res.locals.idu=req.session.idu;
          res.locals.user=req.session.user;
          res.locals.email=req.session.email;

          res.render('clientes/list',{data:rows});
      }
  });
});

module.exports = router;
