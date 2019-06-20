module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `tasks` ORDER BY bucket ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: 'Welcome to SoliDesk | View Tasks'
                ,tasks: result
            });
        });
    }
};
