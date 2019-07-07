class group {
	constructor(type, id, tasks) {
		var group = document.createDocumentFragment();
		this._id = id;
		this._type = type;
		this._tasks = tasks;
		this._element = document.createElement('div');
		tasks.forEach(function(idx){
			this._element.appendChild(tasks[idx]).cloneNode(true);
		});
		this._element.class = "bg-dark";
	}

	updateInfo(info) {
		$(this._element).attr('data-groupinfo', JSON.stringify(info));
	}

	get id() {
		return this._id;
	}
	set id(no) {
		this._id = no;
		$(this._element).attr('id', no);
		let info = $(this._element).data('taskinfo');
		info.id = no;
		this.updateInfo(info);
	}
	get type() {
		return this._type;
	}
}
