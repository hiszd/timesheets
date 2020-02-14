module.exports = {
	getLoginPage: (req, res, next) => {
		let query = "SELECT * FROM `users` ORDER BY id ASC"; // query database to get all the users
		res.charset = "UTF-8";
		res.set({ 'content-type': 'text/html; charset=utf-8' });
		// execute query
		login.query(query, (err, result) => {
			if (err) {
				res.render('error.ejs', {
					title: 'Please Login to Timesheets | ERROR'
					,error: err
				});
				console.log("login.js-"+err);
			} else {
				res.render('login.ejs', {
					title: 'Please Login to Timesheets | Welcome'
					,message: ''
					,users: result
				});
			}
			res.end();
		});
	},
	Login: (req, res, next) => {
		let query = 'SELECT EXISTS(SELECT * FROM users WHERE password=AES_ENCRYPT("'+req.body.password+'", "JBGTKQ12") AND username="'+req.body.user+'");'; // query database to get all the users
		res.charset = "UTF-8";
		// execute query
		login.query(query, (err, result) => {
			if (err) {
				console.log("login.js-"+err);
				return res.status(500).send(err);
			} else {
				res.writeHead(200, { 'Content-Type': 'text/json' });
				console.log(result[0]);
				var selectresult = undefined;
				for (keys in result[0]) {
					selectresult = result[0][keys];
				}
				console.log(selectresult);
				//console.log(result[0].toString().substring(findindex, findindex+10));
				res.end('{ "result": "'+selectresult+'"}');
			}
			res.end();
		});
	}
};
