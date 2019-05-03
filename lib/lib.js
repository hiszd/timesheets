module.exports = {
	tableDoesExist: (db,table) => {
		let query = "SHOW TABLES LIKE '"+ table +"';";

		return db.query(query, (err,result) => {
			if(err) { throw err; }
			if(result!==""){return 1;}
			else{return 0;}
		});
	},
	itemDoesExist: (db,table,item_type,item) => {

		let query = "SELECT * FROM `"+table+"` WHERE "+item_type+" = '" + item + "'";

		let rslt = null;
		db.query(query, (err,result) => {
			if(err) { throw err; }
			if(result.length > 0){rslt = 1;}
			else{rslt = 0;}
		});
		return rslt;
	},
	addItem: (db, table, item) => {

		db.query("USE "+db+";")

// Select the table item based on the first key of the object and it's value
		let itemQuery = "SELECT * FROM `"+table+"` WHERE "+Object.keys(item)[0]+" = '" +Object.values(item)[0]+ "';";

		db.query(itemQuery, (err, result) => {
			if (err) {
				rtrn = 1;
			}
			if (result.length > 0) {
				rtrn = 1;
				} else {
				// send the item's details to the database
				let query = "INSERT INTO '"+table+"' ("+Object.keys(item).join(", ")+") VALUES ('"+Object.values(item).join(", ")+"');";
				db.query(query, (err, result) => {
					if (err) {
						rtrn = 1;
					} else {
						rtrn = 0;
					}
				});
			}
		});
	}
};