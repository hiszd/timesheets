const {conditionOutput} = require('../lib/lib');
module.exports = {
	getHomePage: (req, res, next) => {
		let query = "SELECT * FROM `tasks` ORDER BY bucket ASC"; // query database to get all the players
		res.charset = "UTF-8";
		res.set({ 'content-type': 'text/html; charset=utf-8' });
		// execute query
		db.query(query, (err, result) => {
			if (err) {
				res.render('error.ejs', {
					title: 'Welcome to SoliDesk | ERROR'
					,error: err
				});
				console.log("index.js-"+err);
			} else {
				result.forEach(function(itm, i) {
					itm.bucket = conditionOutput(itm.bucket);
					itm.task = conditionOutput(itm.task);
					itm.description = conditionOutput(itm.description);
					itm.notes = conditionOutput(itm.notes);
				});
				res.render('index.ejs', {
					title: 'Welcome to SoliDesk | View Tasks'
					,tasks: result
				});
			}
			res.end();
		});
	}
};
