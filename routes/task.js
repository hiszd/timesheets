const fs = require('fs');
const {tableDoesExist, itemDoesExist, addItem, conditionInput, conditionOutput} = require('../lib/lib');

module.exports = {
    addTaskPage: (req, res) => {
	res.render('add-task.ejs', {
	    title: 'Welcome to Solidesk | Add a new task'
	    ,message: ''
	});
    },
    addTask: (req, res) => {
	let message = '';
	let bucket = conditionInput(req.body.bucket);
	let stats = conditionInput(req.body.status);
	let task = conditionInput(req.body.task);
	let time = conditionInput(req.body.time);
	let notes = conditionInput(req.body.notes);
	let description = conditionInput(req.body.description);

	if(itemDoesExist(db,"tasks","task",task)) {
	    message = 'Task already exists';
	    res.render('add-task.ejs', {
		message,
		title: 'Welcome to Solidesk | Add a new task'
	    });
	} else {
	    let query = 'INSERT INTO `tasks` (bucket, task, status, time, notes, description) VALUES ("'+bucket+'", "'+task+'", "'+stats+'", "'+time+'", "'+notes+'", "'+description+'");';
	    db.query(query, (err,result) => {
		if(err) {return res.status(500).send(err);}
		res.redirect('/');
	    });
	}
    },
    editTaskPage: (req, res) => {
	let id = req.params.id;
	let query = "SELECT * FROM `tasks` WHERE id = '" + id + "' ";
	db.query(query, (err, result) => {
	    if (err) {
		return res.status(500).send(err);
	    }
	    if(!result[0]) {console.log("Task Not Found");}
	    result[0].bucket = conditionOutput(result[0].bucket);
	    result[0].task = conditionOutput(result[0].task);
	    result[0].description = conditionOutput(result[0].description);
	    result[0].notes = conditionOutput(result[0].notes);
	    res.render('edit-task.ejs', {
		title: 'Edit  Task'
		,task: result[0]
		,message: ''
	    });
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

	let query = 'UPDATE `tasks` SET `time` = "' + time + '", `bucket` = "' + bucket + '", `status` = "' + stats + '", `task` = "' + task + '", `notes` = "' + notes + '", `description` = "' + description + '" WHERE `tasks`.`id` = "' + id + '";';
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
