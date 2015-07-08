var express = require('express');
var app = express();
var _ = require('underscore');
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// seed user data
var users = [
	{
		id: 1,
		username: 'bob',
		firstname: 'Bob',
		lastname: 'Jones',
		age: 35
	},
	{
		id: 2,
		username: 'meg',
		firstname: 'Meg',
		lastname: 'White',
		age: 30
	},
	{
		id: 3,
		username: 'joe',
		firstname: 'Joe',
		lastname: 'Brown',
		age: 31
	}
]

// directing Express to the static HTML file
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// find all users
app.get('/users', function(req, res) {
	res.json(users);
});

// find a specific user
app.get('/users/:id', function(req, res) {
	for (i = 0; i < users.length; i++) {
		if (req.params.id == users[i].id) { //cannot use === b/c req is a string and id is an integer
			res.json(users[i]);
		};
	};
});

// find user by username
app.get('/users/un/:username', function(req, res) {
	for (i = 0; i < users.length; i++) {
		if (req.params.username == users[i].username) { //cannot use === b/c req is a string and id is an integer
			res.json(users[i]);
		};
	};
});

// add a new user
app.post('/users', function(req, res) {
	var newUser = req.body;
	users.push(newUser);
	res.json(newUser);
});

// update a user by ID
app.put('/users/:id', function(req, res) {
	var targetId = parseInt(req.params.id); //changes req.params.id from a string to an integer so var foundUser will work
	var foundUser = _.findWhere(users, {id: targetId});

	foundUser.username = req.body.username;
	foundUser.firstname = req.body.firstname;
	foundUser.lastname = req.body.lastname;
	foundUser.age = req.body.age;

	console.log('These are the req.params');
	console.log(req.params);

	console.log('This is the req.body');
	console.log(req.body);

	res.json('Updated ' + targetId);
});

// update user by username
app.put('/users/un/:username', function(req, res) {
	var targetUser = req.params.username;
	var foundUser = _.findWhere(users, {username: targetUser});

	foundUser.id = parseInt(req.body.id);
	foundUser.firstname = req.body.firstname;
	foundUser.lastname = req.body.lastname;
	foundUser.age = req.body.age;

	res.json(targetUser);
});

// delete a user
app.delete('/users/:id', function(req, res) {
	var targetId = parseInt(req.params.id); //changes req.params.id from a string to an integer so var foundUser will work
	var foundUser = _.findWhere(users, {id: targetId});

	var index = users.indexOf(foundUser);
	users.splice(index, 1);
		res.json('Deleted ' + foundUser);
});




















app.listen(1234);