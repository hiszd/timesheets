const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {addTaskPage, addTask, deleteTask, editTask, editTaskPage, getTask} = require('./routes/task');
const {tableDoesExist, itemDoesExist} = require('./lib/lib');

const port = 3000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
	host: "localhost",
	user: "root",
	password: "password",
	database: "solidesk1",
	port: 3306
});

// connect to database
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log('Connected to database');
	var query = "CREATE TABLE IF NOT EXISTS `tasks` ( `id` int(32) NOT NULL AUTO_INCREMENT, `bucket` varchar(255) NOT NULL, `task` varchar(255) NOT NULL, `status` varchar(255) NOT NULL, `time` varchar(255) NOT NULL, `notes` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;";
	db.query(query, (err, result) => {
		if (err) {
			throw err;
		}
		console.log("Table Setup.");
	});
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

// routes for the app
app.get('/', getHomePage);
app.get('/edit/:id', editTaskPage);
app.get('/add', addTaskPage);
app.get('/delete/:id', deleteTask);
app.get('/get/:id', getTask);
app.post('/add', addTask);
app.post('/edit/:id', editTask);

// set the app to listen on the port
app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
if(process.env.NODE_ENV !== 'production') {

	process.once('uncaughtException', function(err) {

		console.error('FATAL: Uncaught exception.');

		console.error(err.stack||err);

		setTimeout(function(){

			process.exit(1);

		}, 100);

	});

}
