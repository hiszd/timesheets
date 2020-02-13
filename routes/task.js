const fs = require('fs');
const { tableDoesExist, itemDoesExist, addItem, conditionInput, conditionOutput } = require('../lib/lib');

module.exports = {
	addHoursPage: (req, res) => {
		res.render('add-hours.ejs', {
			title: 'Welcome to Timesheets | Add new hours'
			, message: ''
		});
	},
	addHours: (req, res) => {
		let message = '';
		let bucket = conditionInput(req.body.bucket);
		let stats = conditionInput(req.body.status);
		let task = conditionInput(req.body.task);
		let time = conditionInput(req.body.time);
		let notes = conditionInput(req.body.notes);
		let description = conditionInput(req.body.description);

		if (itemDoesExist(db, req.params.user, "id", req.body.id)) {
			message = 'Task already exists';
			res.render('add-entry.ejs', {
				message,
				title: 'Welcome to Timesheets | Add new hours'
			});
		} else {
			let query = 'INSERT INTO `'+req.params.user+'` (bucket, task, status, time, notes, description) VALUES ("' + bucket + '", "' + task + '", "' + stats + '", "' + time + '", "' + notes + '", "' + description + '");';
			db.query(query, (err, result) => {
				if (err) { return res.status(500).send(err); }
				res.redirect('/');
			});
		}
	},
	editHoursPage: (req, res) => {
		let id = req.params.id;
		let query = "SELECT * FROM `"+req.params.user+"` WHERE id = '" + id + "' ";
		db.query(query, (err, result) => {
			if (err) {
				return res.status(500).send(err);
			}
			if (!result[0]) { console.log("Task Not Found"); }
			res.render('edit-entry.ejs', {
				title: 'Edit  Hours'
				, task: result[0]
				, message: ''
			});
		});
	},
	getTask: (req, res) => {
		let query = "SELECT * FROM `"+req.params.user+"` WHERE id = '" + req.params.id + "' ";
		db.query(query, (err, result) => {
			if (err) {
				return res.status(500).send(err);
			}
			res.writeHead(200, { 'Content-Type': 'text/json' });
			res.end(JSON.stringify(result[0]));
		});
	},
	getTasks: (req, res) => {
		let query = "SELECT * FROM `"+req.params.user+"`;";
		db.query(query, (err, result) => {
			if (err) {
				return res.status(500).send(err);
			}
			res.writeHead(200, { 'Content-Type': 'text/json' });
			res.end(JSON.stringify(result));
		});
	},
	editTask: (req, res) => {
		let id = conditionInput(req.params.id);
		let bucket = conditionInput(req.body.bucket);
		let stats = conditionInput(req.body.status);
		let task = conditionInput(req.body.task);
		let time = conditionInput(req.body.time);
		let notes = conditionInput(req.body.notes);
		let description = conditionInput(req.body.description);
		let complete = conditionInput(req.body.complete);

		let query = 'UPDATE `tasks` SET `time` = "' + time + '", `bucket` = "' + bucket + '", `status` = "' + stats + '", `task` = "' + task + '", `notes` = "' + notes + '", `description` = "' + description + '", `complete` = "' + complete + '" WHERE `tasks`.`id` = "' + id + '";';
		db.query(query, (err, result) => {
			if (err) {
				return res.status(500).send(err);
			}
			res.redirect('/');
		});
	},
	deleteTask: (req, res) => {
		let id = req.params.id;
		let deleteUserQuery = 'DELETE FROM tasks WHERE id = "' + id + '";';


		db.query(deleteUserQuery, (err, result) => {
			if (err) {
				return res.status(500).send(err);
			}
			res.redirect('/');
		});
	}
};
