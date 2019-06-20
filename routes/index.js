module.exports = {
    getHomePage: (req, res, next) => {
        let query = "SELECT * FROM `tasks` ORDER BY bucket ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.render('error.ejs', {
		    title: 'Welcome to SoliDesk | ERROR'
		    ,error: err
		});
		console.log("index.js-"+err);
            } else {
		res.render('index.ejs', {
                    title: 'Welcome to SoliDesk | View Tasks'
                    ,tasks: result
		});
		console.log("Tasks:"+result);
	    }
	    res.end();
        });
    }
};
