class task {
	constructor(argmap) {
		if(argmap.selector) {
			this._element = document.getElementById(argmap.selector);
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
		} else if(argmap.object) {
			this._frag = document.createDocumentFragment();
			this._element = jQuery('<div/>', {id: argmap.object.id,"class": 'card hovergrow mr-3 border-1-gray',"data-daskinfo": JSON.stringify(argmap.object)}).appendTo(this._frag);
			this._bucketel = jQuery('<div/>', {id: "bucket","class": 'card-header bg-gray text-white text-1-5'}).append(argmap.object.bucket).appendTo(this._element);
			this._bucket = $(this._element).data('taskinfo').bucket;
			this._bodyel = jQuery('<div/>', {id: "body","class": 'card-body bg-dark'}).appendTo(this._element);
			this._taskel = jQuery('<h5/>', {id: "task","class": 'card-title bg-gray text-white p-2 text-center rounded-lg'}).append(argmap.object.task).appendTo(this._bodyel);
			this._groupel = jQuery('<ul/>', {id: "group","class": 'list-group list-group-flush mb-3 wsn'});
			this._statusel = jQuery('<em/>', {id: "status","class": 'pl-1'});
			this._timeel = jQuery('<em/>', {id: "time","class": 'pl-1'});
			this._notesel = jQuery('<em/>', {id: "notes","class": 'pl-1'});
			this._descel = jQuery('<em/>', {id: "desc","class": 'pl-1'});
			$(this._groupel).append(jQuery('<li/>', {class": 'list-group-item bg-dark p-0 text-light align-middle border-top-gray rounded-lg'}).append(jQuery('<label/>', {"class": 'm-0 w-25 text-right border-dark border bg-light-gray rounded-left-lg text-white', "for": 'status'}).html("Status:")).append(this._statusel));
			$(this._groupel).append(jQuery('<li/>', {class": 'list-group-item bg-dark p-0 text-light align-middle border-top-gray rounded-lg'}).append(jQuery('<label/>', {"class": 'm-0 w-25 text-right border-dark border bg-light-gray rounded-left-lg text-white', "for": 'time'}).html("Time Req:")).append(this._timeel));
			$(this._groupel).append(jQuery('<li/>', {class": 'list-group-item bg-dark p-0 text-light align-middle border-top-gray rounded-lg'}).append(jQuery('<label/>', {"class": 'm-0 w-25 text-right border-dark border bg-light-gray rounded-left-lg text-white', "for": 'notes'}).html("Notes:")).append(this._notesel));
			$(this._groupel).append(jQuery('<li/>', {class": 'list-group-item bg-dark p-0 text-light align-middle border-top-bottom-gray rounded-lg'}).append(jQuery('<label/>', {"class": 'm-0 w-25 text-right border-dark border bg-light-gray rounded-left-lg text-white', "for": 'desc'}).html("Desc:")).append(this._descel));
			$(this._groupel).appendTo(this._bodyel);
			$(this._bodyel).append(jQuery('<a/>', {"href": '/delete/'+argmap.object.id, "class": 'btn btn-sm btn-danger border border-dark'}).html("Delete"));
		}
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
