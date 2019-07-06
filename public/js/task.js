class task {
	constructor(selector) {
		this._element = document.getElementById(selector);
		this._id = $(this._element).data('taskinfo').id;
		this._bucketel = $(this._element).find('#bucket');
		this._bucket = $(this._element).data('taskinfo').bucket;
		this._taskel = $(this._element).find('#task');
		this._task = $(this._element).data('taskinfo').task;
		this._statusel = $(this._element).find('#status');
		this._status = $(this._element).data('taskinfo').status;
		this._timeel = $(this._element).find('#time');
		this._time = $(this._element).data('taskinfo').time;
		this._notesel = $(this._element).find('#notes');
		this._notes = $(this._element).data('taskinfo').notes;
		this._descel = $(this._element).find('#desc');
		this._desc = $(this._element).data('taskinfo').description;
	}

	updateInfo(info) {
		$(this._element).attr('data-taskinfo', JSON.stringify(info));
	}

	get id() {
		return this._id;
	}
	set id(no) {
		this._id = no;
		$(this._element).attr('id', no);
		$(this._element).data('taskinfo').id = no;
	}
	get bucket() {
		return this._bucket
	}
	set bucket(no) {
		this._bucket = no;
		this._bucketel.text(no);
		$(this._element).data('taskinfo').bucket = no;
	}
	get task() {
		return this._task;
	}
	set task(no) {
		this._task = no;
		$(this._taskel).text(no);
		let info = $(this._element).data('taskinfo');
		info.task = no;
		this.updateInfo(info);
		console.log(info);
	}
	get status() {
		return this._status;
	}
	set status(no) {
		this._status = no;
		this._statusel.text(no);
		let info = $(this._element).data('taskinfo');
		info.status = no;
		this.updateInfo(info);
	}
	get time() {
		return this._times;
	}
	set time(no) {
		this._time = no;
		this._timeel.text(no);
		let info = $(this._element).data('taskinfo');
		info.time = no;
		this.updateInfo(info);
	}
	get notes() {
		return this._notes;
	}
	set notes(no) {
		this._notes = no;
		this._notesel.text(no);
		let info = $(this._element).data('taskinfo');
		info.notes = no;
		this.updateInfo(info);
	}
	get desc() {
		return this._desc;
	}
	set desc(no) {
		this._desc = no;
		this._descel.text(no);
		let info = $(this._element).data('taskinfo');
		info.description = no;
		this.updateInfo(info);
	}
}
