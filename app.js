const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {
	getHomePage
} = require('./routes/index');
const {
	addHoursPage,
	addHours,
	deleteTask,
	editTask,
	editHoursPage,
	getTask,
	getTasks
} = require('./routes/task');
const {
	tableDoesExist,
	itemDoesExist
} = require('./lib/lib');
const {
	getLoginPage,
	Login
} = require('./routes/login');

const port = 3000;

const login = mysql.createConnection({
	host: "localhost",
	user: "base",
	password: "csi7701!",
	database: "admin",
	port: 3306
});

// connect to database
login.connect((err) => {
	if (err) {
		throw err;
	}
	console.log('Connected to database');
	var query = "SELECT * FROM users;";
	login.query(query, (err, result) => {
		if (err) {
			throw err;
		}
		console.log("Table Setup.");
	});
});
global.login = login;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "timesheets1",
	port: 3306
});

// connect to database
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

// routes for the app
app.get('/', getHomePage);
app.get('/edit/:id', editHoursPage);
app.get('/add', addHoursPage);
app.get('/delete/:id', deleteTask);
app.get('/get/:id', getTask);
app.get('/get/', getTasks);
app.get('/login', getLoginPage);
app.post('/userlogin', Login);
app.post('/add', addHours);
app.post('/edit/:id', editTask);

// set the app to listen on the port
app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
if (process.env.NODE_ENV !== 'production') {

	process.once('uncaughtException', function (err) {

		console.error('FATAL: Uncaught exception.');

		console.error(err.stack || err);

		setTimeout(function () {

			process.exit(1);

		}, 100);

	});

}