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

var UserRoute = router.route('/users');
UserRoute.post(function(req, res){

	var user = new User();
	user.name = req.body.name;
	user.save(function(error){
		if(error)
			res.send(error);

		res.json({ message: 'Usuario criado!', data: user });
	});
});
UserRoute.get(function(req, res) {
	User.find(function (err, users) {
		if (err)
			res.send(err);

		res.json(users);
	});
});


var UserRouteId = router.route('/users/:user_id');
UserRouteId.get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);

        res.json(user);
    });
});

UserRouteId.put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);

        user.name = req.body.name;

        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Usuario Atualizado!' });
        });
    });
});

UserRouteId.delete(function(req, res) {
    User.remove({
        _id: req.params.user_id
    }, function(err, user) {
        if (err)
            res.send(err);

        res.json({ message: 'Usuario Deletado' });
    });
});

app.use('/api', router);
app.listen(port);

console.log('Server on port ' + port);
