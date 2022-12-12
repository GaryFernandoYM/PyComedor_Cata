var mysql = require('mysql');
var connection = mysql.createConnection({
	multipleStatements: true,
	host:'localhost',
	user:'root',
	password:'',
	database:'dbComedorCata'
});

connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..!');
	}
});

module.exports = connection;
