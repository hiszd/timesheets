const {
	conditionOutput
} = require('../lib/lib');
module.exports = {
	getHomePage: (req, res, next) => {
		let query = "SHOW TABLES;";
		if (req.query.user != "" && req.query.user != undefined) {
			query = "SELECT * FROM `" + req.query.user + "` ORDER BY time ASC"; // query database to get all the timesheets
		}
		res.charset = "UTF-8";
		res.set({
			'content-type': 'text/html; charset=utf-8'
		});
		console.log(query);
		// execute query
		db.query(query, (err, result) => {
			if (err) {
				res.render('error.ejs', {
					title: 'Welcome to Timesheets | ERROR',
					error: err,
					users: null
				});
				console.log("index.js-" + err);
			} else {
				res.render('index.ejs', {
					title: 'Welcome to Timesheets | View Hours',
					tasks: result,
					users: req.query.user
				});
			}
			res.end();
		});
	}
};