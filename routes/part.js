const fs = require('fs');

module.exports = {
    addPartPage: (req, res) => {
        res.render('add-part.ejs', {
            title: 'Welcome to BizTracker | Add a new part'
            ,message: ''
        });
    },
    addPart: (req, res) => {
        let message = '';
        let station_id = req.body.station_id;
        let status = req.body.status;
        let qty = req.body.qty;
        let manufacturer = req.body.manufacturer;
        let part_number = req.body.part_number;
        let description = req.body.description;
	
        let itemQuery = "SELECT * FROM `items` WHERE part_number = '" + part_number + "'";
	
        db.query(itemQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Part already exists';
                res.render('add-part.ejs', {
                    message,
                    title: 'Welcome to BizTracker | Add a new part'
                });
            } else {
                // check the filetype before uploading it
                // send the player's details to the database
                let query = "INSERT INTO `items` (station_id, status, qty, manufacturer, part_number, description) VALUES ('" +
                    station_id  + "', '" + status + "', '" + qty + "', '" + manufacturer + "', '" + part_number + "', '" + description + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
	    }
	});
    },
    editPartPage: (req, res) => {
	let id = req.params.id;
	let query = "SELECT * FROM `items` WHERE id = '" + id + "' ";
	db.query(query, (err, result) => {
            if (err) {
		return res.status(500).send(err);
            }
	    if(!result[0]) {console.log("Part Not Found");}
            res.render('edit-part.ejs', {
		title: 'Edit  Part'
		,part: result[0]
		,message: ''
            });
	});
    },
    editPart: (req, res) => {
	let id = req.params.id;
	let station_id = req.body.station_id;
	let status = req.body.status;
	let qty = req.body.qty;
	let manufacturer = req.body.manufacturer;
        let part_number = req.body.part_number;
        let description = req.body.description;
	
        let query = "UPDATE `items` SET `part_number` = '" + part_number + "', `station_id` = '" + station_id + "', `status` = '" + status + "', `qty` = '" + qty + "', `manufacturer` = '" + manufacturer + "' WHERE `items`.`id` = '" + id + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deletePart: (req, res) => {
        let id = req.params.id;
        let deleteUserQuery = 'DELETE FROM items WHERE id = "' + id + '"';
	
	
        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};
