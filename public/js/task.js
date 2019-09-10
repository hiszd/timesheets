class Task {
	constructor(argmap) {
		if (argmap.selector) { // If the element already exists and we need to use that then fill all the data
			this._element = $(argmap.selector);
			this._taskinfo = $(this._element).attr('data-taskinfo');
			this._id = this._taskinfo.id;
			this._bucketel = $(this._element).find('#bucket');
			this._bucket = this._taskinfo.bucket;
			this._taskel = $(this._element).find('#task');
			this._task = this._taskinfo.task;
			this._statusel = $(this._element).find('#status');
			this._status = this._taskinfo.status;
			this._timeel = $(this._element).find('#time');
			this._time = this._taskinfo.time;
			this._notesel = $(this._element).find('#notes');
			this._notes = this._taskinfo.notes;
			this._descel = $(this._element).find('#desc');
			this._desc = this._taskinfo.description;
			return this;
		} else if (argmap.object) { // If the element does not exist and we are constructing one from scratch
			var obj = JSON.parse(argmap.object); // Element data(argmap.object) is in key: value format so we need to convert to JSON
			this._id = obj.id;
			this._element = jQuery('<div/>', { id: obj.id, "class": 'card hovergrow mr-3 border-1-gray', "data-taskinfo": JSON.stringify(obj) }); // Build the main element to put the others into
			this._taskinfo = obj;
			this._taskel = jQuery('<div/>', { id: "task", "class": 'card-header bg-gray text-white text-1-5' }) // Build the card-header
			$(this._taskel).append(jQuery('<span/>', { "class": 'task-text' }).html(obj.task)); // Append the text itself
			this._completeel = jQuery('<button/>', { id: 'complete', "class": 'closebutton' }).append(document.querySelector("#checkbox-temp").cloneNode(true)); // Build and append the container and checkbox
			$(this._completeel).children("#checkbox-temp").removeAttr("style").attr("id", "checkbox"); // Make element visable and give it a proper id
			var state = { "#background": { "fill": "#fff", "stroke": "#646464" }, "#checkout": { "display": "inherit" }, "#checkfill": { "height": "0.5rem" } };// Build configuration for SVG animation to be passed later
			// Build function for handling setup before element is clicked
			var preclk = (itm) => {
				if (itm._clickedState == 1) {
					itm._element.find("#checkfill").css("display", "none");
				}
			}
			// Build function for handling tear-down after element is clicked
			var postclk = (itm) => {
				if (itm._clickedState == 1) {
					itm._element.find("#checkfill").css("display", "inline");
					itm._restoreStyle["#checkfill"]["height"] = "0px";
					var info_wrk = this.taskinfo;
					info_wrk.status = "Closed";
					this.taskinfo = info_wrk;
				} else if (itm._clickedState == 0) {
					var info_wrk = this.taskinfo;
					info_wrk.status = "Open";
					this.taskinfo = info_wrk;
				}
			}
			// Initialize class for SVG handling and pass our pre-built information through
			this._svg = new SVG({ "element": $(this._completeel).find("svg"), "clickToggle": 1, "clickStyle": state, "preClick": preclk, "postClick": postclk });
			// Append our SVG to the header
			if (obj.status == "Closed") {
				this._svg.state = 1;
			}
			$(this._taskel).append(this._completeel);
			// Append the header to the card
			$(this._taskel).appendTo(this._element);

			// Build the body of the card
			this._task = obj.task;
			this._bucket = obj.bucket;
			this._bodyel = jQuery('<div/>', { id: "body", "class": 'card-body' });
			this._descel = jQuery('<h5/>', { id: "desc", "class": 'card-title bg-gray text-white p-2 text-center rounded-lg' }).html(obj.description).appendTo(this._bodyel);
			this._desc = obj.description;
			this._groupel = jQuery('<ul/>', { id: "group", "class": 'list-group list-group-flush mb-3 wsn' });
			this._statusel = jQuery('<em/>', { id: "status", "class": 'pl-1' }).html(obj.status);
			this._status = obj.status;
			this._timeel = jQuery('<em/>', { id: "time", "class": 'pl-1' }).html(obj.time);
			this._time = obj.time;
			this._notesel = jQuery('<em/>', { id: "notes", "class": 'pl-1' }).html(obj.notes);
			this._notes = obj.notes;
			$(this._groupel).append(jQuery('<li/>', { "class": 'list-group-item bg-dark p-0 text-light align-middle border-top-gray rounded-lg' }).append(jQuery('<label/>', { "class": 'm-0 w-25 text-right border-dark border bg-light-gray rounded-left-lg text-white', "for": 'status' }).html("Status:")).append(this._statusel));
			$(this._groupel).append(jQuery('<li/>', { "class": 'list-group-item bg-dark p-0 text-light align-middle border-top-gray rounded-lg' }).append(jQuery('<label/>', { "class": 'm-0 w-25 text-right border-dark border bg-light-gray rounded-left-lg text-white', "for": 'time' }).html("Time Req:")).append(this._timeel));
			$(this._groupel).append(jQuery('<li/>', { "class": 'list-group-item bg-dark p-0 text-light align-middle border-top-bottom-gray rounded-lg' }).append(jQuery('<label/>', { "class": 'm-0 w-25 text-right border-dark border bg-light-gray rounded-left-lg text-white', "for": 'desc' }).html("Notes:")).append(this._notesel));
			$(this._groupel).appendTo(this._bodyel);
			$(this._bodyel).append(jQuery('<a/>', { "href": '/delete/' + obj.id, "class": 'btn btn-sm btn-danger border border-dark' }).html("Delete"));
			$(this._bodyel).append(jQuery('<button/>', { "type": 'button', "class": 'btn btn-sm btn-warning border border-dark', "data-toggle": 'modal', "data-target": '#editModal', "data-id": obj.id }).html("Edit"));
			$(this._element).append(this._bodyel);
			this._bob = makeObserver(this._element, (mutationsList, observer) => {
				for (let mutation of mutationsList) {
					if (mutation.type === 'attributes') {
						console.log('The ' + mutation.attributeName + ' attribute was modified.');
						if (mutation.attributeName == "data-taskinfo") {
							this.updateElements();
						}
					}
				}
			});
			return this;
		}
	}

	updateElements() {
		var taskinfo = this.taskinfo;
		this.id = taskinfo.id;
		this.bucket = taskinfo.bucket;
		this.task = taskinfo.task;
		this.status = taskinfo.status;
		this.time = taskinfo.time;
		this.notes = taskinfo.notes;
		this.desc = taskinfo.description;
	}

	get taskinfo() {
		if (JSON.parse($(this._element).attr('data-taskinfo')) == this._taskinfo) {
			return JSON.parse($(this._element).attr('data-taskinfo'));
		} else {
			this._taskinfo = JSON.parse($(this._element).attr('data-taskinfo'));
			return JSON.parse($(this._element).attr('data-taskinfo'));
		}
	}

	set taskinfo(info) {
		/*$(this._element).attr('data-taskinfo', JSON.stringify(info));
		this._taskinfo = info;*/
		if (info != this._taskinfo) {
			if (info.id != this._id) {
				this.id = info.id;
			} else if (info.bucket != taskinfo._bucket) {
				this.bucket = info.bucket;
			} else if (info.task != taskinfo._task) {
				this.task = info.task;
			} else if (info.status != taskinfo._status) {
				this.status = info.status;
			} else if (info.time != taskinfo._time) {
				this.time = info.time;
			} else if (info.notes != taskinfo._notes) {
				this.notes = info.notes;
			} else if (info.desc != taskinfo._desc) {
				this.desc = info.description;
			}
			$(this._element).attr('data-taskinfo', JSON.stringify(info))
		}
	}

	get element() {
		return this._element;
	}

	set element(no) {
		return;
	}

	get id() {
		if (this._taskinfo.id == this._id) {
			return this._id;
		} else {
			this._id = this._taskinfo.id;
			return this._taskinfo.id;
		}
	}

	set id(no) {
		this._id = no;
		$(this._element).attr('id', no);
	}

	get bucket() {
		if (this._taskinfo.bucket == this._bucket) {
			return this._bucket;
		} else {
			this._bucket = this._taskinfo.bucket;
			return this._taskinfo.bucket;
		}
	}

	set bucket(no) {
		this._bucket = no;
		//this._bucketel.text(no);
	}

	get task() {
		if (this._taskinfo.task == this._task && this._taskel.text() == this._task) {
			return this._task;
		} else {
			this._task = this._taskinfo.task;
			this._taskel.text(this._taskinfo.task);
			return this._taskinfo.task;
		}
	}

	set task(no) {
		this._task = no;
		$(this._taskel).text(no);
	}

	get status() {
		if (this._taskinfo.status == this._status && this._statusel.text() == this._status) {
			return this._status;
		} else {
			this._status = this._taskinfo.status;
			this._statusel.text(this._taskinfo.status);
			return this._taskinfo.status;
		}
	}

	set status(no) {
		this._status = no;
		this._statusel.text(no);
	}

	get time() {
		if (this._taskinfo.time == this._time && this._timeel.text() == this._time) {
			return this._time;
		} else {
			this._time = this._taskinfo.time;
			this._timeel.text(this._taskinfo.time);
			return this._taskinfo.time;
		}
	}

	set time(no) {
		this._time = no;
		this._timeel.text(no);
	}

	get notes() {
		if (this._taskinfo.notes == this._notes && this._notesel.text() == this._notes) {
			return this._notes;
		} else {
			this._notes = this._taskinfo.notes;
			this._notesel.text(this._taskinfo.notes);
			return this._taskinfo.notes;
		}
	}

	set notes(no) {
		this._notes = no;
		this._notesel.text(no);
	}

	get desc() {
		if (this._taskinfo.description == this._desc && this._descel.text() == this._desc) {
			return this._desc;
		} else {
			this._desc = this._taskinfo.description;
			this._descel.text(this._taskinfo.description);
			return this._taskinfo.description;
		}
	}

	set desc(no) {
		this._desc = no;
		this._descel.text(no);
	}
}
