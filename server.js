var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./app/models/user');

mongoose.connect('mongodb://localhost/teste');

var db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var router = express.Router();

router.get('/', function(req, res){
	res.json({ message: 'OK' });
});


app.use('/api', router);
app.listen(port);

console.log('Server on port ' + port);
