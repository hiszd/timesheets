class Task{
	constructor(argmap) {
		if (argmap.selector) {
			this._element = $(argmap.selector);
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
			return this._element;
		} else if (argmap.object) {
			var obj = JSON.parse(argmap.object);
			this._frag = document.createDocumentFragment();
			this._id = obj.id;
			this._element = jQuery('<div/>', { id: obj.id, "class": 'card hovergrow mr-3 border-1-gray', "data-taskinfo": JSON.stringify(obj) });
			this._bucketel = jQuery('<div/>', { id: "bucket", "class": 'card-header bg-gray text-white text-1-5' }).html(obj.bucket).appendTo(this._element);
			this._bucket = obj.bucket;
			this._bodyel = jQuery('<div/>', { id: "body", "class": 'card-body bg-dark' });
			this._taskel = jQuery('<h5/>', { id: "task", "class": 'card-title bg-gray text-white p-2 text-center rounded-lg' }).html(obj.task).appendTo(this._bodyel);
			this._task = obj.task;
			this._groupel = jQuery('<ul/>', { id: "group", "class": 'list-group list-group-flush mb-3 wsn' });
			this._statusel = jQuery('<em/>', { id: "status", "class": 'pl-1' }).html(obj.status);
			this._status = obj.status;
			this._timeel = jQuery('<em/>', { id: "time", "class": 'pl-1' }).html(obj.time);
			this._time = obj.time;
			this._notesel = jQuery('<em/>', { id: "notes", "class": 'pl-1' }).html(obj.notes);
			this._notes = obj.notes;
			this._descel = jQuery('<em/>', { id: "desc", "class": 'pl-1' }).html(obj.description);
			this._desc = obj.description;
			$(this._groupel).append(jQuery('<li/>', { "class": 'list-group-item bg-dark p-0 text-light align-middle border-top-gray rounded-lg' }).append(jQuery('<label/>', { "class": 'm-0 w-25 text-right border-dark border bg-light-gray rounded-left-lg text-white', "for": 'status' }).html("Status:")).append(this._statusel));
			$(this._groupel).append(jQuery('<li/>', { "class": 'list-group-item bg-dark p-0 text-light align-middle border-top-gray rounded-lg' }).append(jQuery('<label/>', { "class": 'm-0 w-25 text-right border-dark border bg-light-gray rounded-left-lg text-white', "for": 'time' }).html("Time Req:")).append(this._timeel));
			$(this._groupel).append(jQuery('<li/>', { "class": 'list-group-item bg-dark p-0 text-light align-middle border-top-gray rounded-lg' }).append(jQuery('<label/>', { "class": 'm-0 w-25 text-right border-dark border bg-light-gray rounded-left-lg text-white', "for": 'notes' }).html("Notes:")).append(this._notesel));
			$(this._groupel).append(jQuery('<li/>', { "class": 'list-group-item bg-dark p-0 text-light align-middle border-top-bottom-gray rounded-lg' }).append(jQuery('<label/>', { "class": 'm-0 w-25 text-right border-dark border bg-light-gray rounded-left-lg text-white', "for": 'desc' }).html("Desc:")).append(this._descel));
			$(this._groupel).appendTo(this._bodyel);
			$(this._bodyel).append(jQuery('<a/>', { "href": '/delete/' + obj.id, "class": 'btn btn-sm btn-danger border border-dark' }).html("Delete"));
			$(this._bodyel).append(jQuery('<button/>', { "type": 'button', "class": 'btn btn-sm btn-warning border border-dark', "data-toggle": 'modal', "data-target": '#editModal', "data-id": obj.id }).html("Edit"));
			$(this._element).append(this._bodyel);
			$(this._frag).append(this._element);
			return this._element;
		}
	}

	updateInfo(info) {
		$(this._element).attr('data-taskinfo', JSON.stringify(info));
	}

	get id() {
		return this._id;
	}

	set id(no) {
		this._id=no;$(this._element).attr('id',no);$(this._element).data('taskinfo').id=no;
	}

	get bucket() {
		return this._bucket
	}

	set bucket(no) {
		this._bucket=no;this._bucketel.text(no);$(this._element).data('taskinfo').bucket=no;
	}

	get task() {
		return this._task;
	}

	set task(no) {
		this._task=no;$(this._taskel).text(no);let info=$(this._element).data('taskinfo');info.task=no;this.updateInfo(info);console.log(info);
	}

	get status() {
		return this._status;
	}

	set status(no) {
		this._status=no;this._statusel.text(no);let info=$(this._element).data('taskinfo');info.status=no;this.updateInfo(info);
	}

	get time() {
		return this._times;
	}

	set time(no) {
		this._time=no;this._timeel.text(no);let info=$(this._element).data('taskinfo');info.time=no;this.updateInfo(info);
	}

	get notes() {
		return this._notes;
	}

	set notes(no) {
		this._notes=no;this._notesel.text(no);let info=$(this._element).data('taskinfo');info.notes=no;this.updateInfo(info);
	}

	get desc() {
		return this._desc;
	}

	set desc(no) {
		this._desc=no;this._descel.text(no);let info=$(this._element).data('taskinfo');info.description=no;this.updateInfo(info);}
}
