/// <reference path="../public/js/lib/lib.js"/>
/// <reference path="task.ts"/>
class TaskGroup {
	_element: any;
	_id: string;
	_tasks: any[];
	_groupInfo: string | string[];
	_header: JQuery<HTMLElement>;
	_bookend: JQuery<HTMLElement>;
	_cont: JQuery<HTMLElement>;
	_arrowcont: JQuery<HTMLElement>;
	_arrow: JQuery<HTMLElement>;
	constructor(argmap: { selector: any; tasks: string; id: string | JQuery.Node | ((this: HTMLElement, index: number, oldhtml: string) => string | JQuery.Node); }) {
		if (argmap.selector) {
			this._element = $(argmap.selector);
			this._id = this._element.attr("id");
			this._tasks = [];
			if (this._element.attr("groupinfo")) {
				this._groupInfo = this._element.attr("groupinfo");
			} else {
				this._groupInfo = [];
				this._element.children().forEach(function (itm, idx) {
					this._groupInfo.push(itm);
					var task1 = new Task({ "selector": itm.id });
					this._tasks.push(task1);
				});
			}
			return this;
		} if (argmap.tasks && argmap.id) {
			var tasks = JSON.parse(argmap.tasks);
			this._tasks = [];
			this._groupInfo = tasks;
			var ele = jQuery('<div/>', { id: argmap.id, "class": 'bg-secondary group' });
			this._header = jQuery('<div/>', { id: 'head', "class": 'group-header' }).html(argmap.id).appendTo(ele);
			var eatask = (itm: any, idx: any) => {
				var task = new Task({ "object": JSON.stringify(itm) })
				this._tasks.push(task);
				$(ele).append(task.element);
				// task._bob.observe(document.getElementById(task._id), { attributes: true });
			}
			tasks.forEach(eatask);
			this._bookend = jQuery('<div/>', { "class": 'bookend align-items-center' });
			this._cont = jQuery('<div/>', { "class": 'bookend-cont align-items-center row' });
			this._arrowcont = jQuery('<div/>', { "class": 'bookend-arrow row' });
			this._arrow = $("#arow-temp").clone(true);
			$(this._arrow).removeAttr("id").removeAttr("style");
			this._arrowcont.append(this._arrow);
			this._cont.append(this._arrowcont);
			// this._cont.append(jQuery('<span/>', { id: 'arrow', "class": 'bookend-arrow' }).html("&#8615;"));
			this._bookend.append(this._cont);
			ele.append(this._bookend);
			this._element = ele;
			return this;
		}
	}

	get element() {
		return this._element;
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
}
