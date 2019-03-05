const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {addPartPage, addPart, deletePart, editPart, editPartPage} = require('./routes/part');
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "password",
    database: "parts",
    port: 3306
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
    var tablecheckquery = "SHOW TABLES LIKE 'items';";
    db.query(tablecheckquery, (err, result) => {
        if (err) {
            throw err;
        } else {
	    if(result!="") {
		console.log("Table Already Exists.");
	    } else {
		var query = "CREATE TABLE IF NOT EXISTS `items` ( `id` int(32) NOT NULL AUTO_INCREMENT, `station_id` varchar(255) NOT NULL, `status` varchar(255) NOT NULL, `qty` int(32) NOT NULL, `manufacturer` varchar(255) NOT NULL, `part_number` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;";
		db.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Table Created.");
                });
	    }
	}
    });
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app
app.get('/', getHomePage);
app.get('/add', addPartPage);
app.get('/edit/:id', editPartPage);
app.get('/delete/:id', deletePart);
app.post('/add', addPart);
app.post('/edit/:id', editPart);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
