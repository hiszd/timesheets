module.exports = {
	conditionInput: (str: string) => {
		let c = {
			'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#039;',
			'#': '&#035;'
		};
		return str.replace(/[<&>'"#]/g, function (s) { return c[s]; });
	},
	conditionOutput: (str: string) => {
		return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&#035;/g, "#");
	},
	tableDoesExist: (db: { query: (arg0: string, arg1: (err: any, result: any) => 1 | 0) => any; }, table: string) => {
		let query = "SHOW TABLES LIKE '" + table + "';";

		return db.query(query, (err, result) => {
			if (err) { throw err; }
			if (result.length > 0) { return 1; }
			else { return 0; }
		});
	},
	itemDoesExist: (db: { query: (arg0: string, arg1: (err: any, result: any) => void) => void; }, table: string, item_type: string, item: string) => {

		let query = "SELECT * FROM `" + table + "` WHERE " + item_type + " = '" + item + "'";

		let rslt = null;
		db.query(query, (err, result) => {
			if (err) { throw err; }
			if (result.length > 0) { rslt = 1; }
			else { rslt = 0; }
		});
		return rslt;
	},
	addItem: (db: { query: (arg0: string, arg1?: (err: any, result: any) => void) => void; }, item: { [s: string]: unknown; }, table: string | ArrayLike<unknown>) => {

		db.query("USE " + db + ";")

		// Select the table item based on the first key of the object and it's value
		let itemQuery = "SELECT * FROM `" + table + "` WHERE " + Object.keys(item)[0] + " = '" + Object.values(item)[0] + "';";

		db.query(itemQuery, (err, result) => {
			let rtrn: number;
			if (err) {
				rtrn = 1;
			}
			if (result.length > 0) {
				rtrn = 1;
			} else {
				// send the item's details to the database
				let query = "INSERT INTO '" + table + "' (" + Object.keys(item).join(", ") + ") VALUES ('" + Object.values(item).join(", ") + "');";
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
