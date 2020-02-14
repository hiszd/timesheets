const {conditionOutput} = require('../lib/lib');
module.exports = {
	getHomePage: (req, res, next) => {
		let query = "SELECT * FROM `"+req.params.user+"` ORDER BY time ASC"; // query database to get all the timesheets
		res.charset = "UTF-8";
		res.set({ 'content-type': 'text/html; charset=utf-8' });
		// execute query
		db.query(query, (err, result) => {
			if (err) {
				res.render('error.ejs', {
					title: 'Welcome to Timesheets | ERROR'
					,error: err
					,users: null
				});
				console.log("index.js-"+err);
			} else {
				res.render('index.ejs', {
					title: 'Welcome to Timesheets | View Hours'
					,tasks: result
					,users: null
				});
			}
			res.end();
		});
	}
};
