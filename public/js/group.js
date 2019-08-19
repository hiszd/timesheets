class TaskGroup {
	constructor(argmap) {
		if (argmap.selector) {
			//			this._id = id;
			//			this._type = type;
			this._element = $(argmap.selector);
			this._tasks = [];
			this._groupinfo = [];
			this._element.children().forEach(function(itm, idx) {
				this._groupinfo.push(itm);
				var task1 = new task({ "selector": itm.id });
				this._tasks.push(task1);
			});
			return this._element;
		} if (argmap.tasks && argmap.id) {
			var tasks = JSON.parse(argmap.tasks);
			this._groupInfo = tasks;
			var ele = jQuery('<div/>', { id: argmap.id, "class": 'bg-secondary group' });
			this._header = jQuery('<div/>', { id: 'head', "class": 'group-header' }).html(argmap.id).appendTo(ele);
			tasks.forEach(function(itm, idx) {
				$(ele).append(new Task({ "object": JSON.stringify(itm) }));
			});
			var bookend = jQuery('<div/>', { "class": 'bookend' });
			bookend.append(jQuery('<span/>', { id: 'arrow', "class": 'bookend-arrow' }).html("&#8615;"))
			ele.append(bookend);
			this._element = ele;
			return this._element;
		}
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
