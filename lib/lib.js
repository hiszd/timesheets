module.exports = {
	tableDoesExist: (db,table) => {
		let query = "SHOW TABLES LIKE '"+ table +"';";

		return db.query(query, (err,result) => {
			if(err) { throw err; }
			if(result!=""){return 1;}
			else{return 0;}
		});
	},
	itemDoesExist: (db,table,item_type,item) => {
		let query = "USE TABLES LIKE '"+ table +"';";

		db.query(query, (err,result) => {
			if(err) {throw err;}
		});

		query = "SELECT * FROM `"+table+"` WHERE "+item_type+" = '" + item + "'";

		return db.query(query, (err,result) => {
			if(err) { throw err; }
			if(result.length > 0){return 1;}
			else{return 0;}
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
	}
};