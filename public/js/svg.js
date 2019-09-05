class SVG {
	constructor(argmap) {
		if (argmap.selector) {
			this._element = $(argmap.selector);
			this._id = this._element.attr("id");
			this._drawnElements = [];
			this._element.children("path, rect, use, circle").forEach(function (itm, idx) {
				this._drawnElements.push(itm);
			});
			if (argmap.clickToggle && argmap.clickStyle && argmap.clickTime) {

			}
			return this;
		} if (argmap.drawnElements && argmap.id) {
		} if (argmap.element) {
			this._element = $(argmap.element);
			this._id = this._element.attr("id");
			this._newStyle = {};
			this._restoreStyle = {};
			this.state = 0;
			/*this._drawnElements = [];
			 $(this._element).find("path, rect, use, circle").forEach(function (itm, idx) {
			 this._drawnElements.push(itm);
			 });*/
			if (argmap.clickToggle && argmap.clickStyle) {
				// if (argmap.preClick !== undefined && typeof argmap.preClick === 'function') { argmap.preClick(this); }
				this._newStyle = argmap.clickStyle;  //JSON.parse(argmap.clickStyle);
				$(this._element).click(() => {
					if (argmap.preClick !== undefined && typeof argmap.preClick === 'function') {
						argmap.preClick(this);
					}
					this.toggle();
					if (argmap.postClick !== undefined && typeof argmap.postClick === 'function') {
						argmap.postClick(this);
					}
				});
			}
			return this;
		}
	}

	toggle() {
		if (this._clickedState == 1) {
			this.state = 0;
		} else if (this._clickedState == 0) {
			this.state = 1;
		}
	}

	get state() {
		if (this._clickedState == this._element.data("state")) {
			return this._clickedState;
		} else {
			throw new Error("Attribute and variable mismatch");
		}
	}

	set state(state) {
		if (state == 0) {
			//console.log(JSON.stringify(this._restoreStyle) + "\n" + JSON.stringify(this._newStyle));
			Object.keys(this._restoreStyle).forEach((itm, idx) => {
				var ele = $(this._element).find(itm);
				ele.css(this._restoreStyle[itm]);
			});
			this._clickedState = 0;
		} else if (state == 1) {
			this._restoreStyle = {};
			Object.keys(this._newStyle).forEach((itm, idx) => {
				var ele = $(this._element).find(itm);
				var itms = {};
				Object.keys(this._newStyle[itm]).forEach((itm, idx) => {
					itms[itm] = ele.css(itm);
				});
				this._restoreStyle[itm] = itms;
				ele.css(this._newStyle[itm]);
			});
			this._clickedState = 1;
		}
		this._element.data("state", this._clickedState);
	}

	get element() {
		return this._element;
	}

	get id() {
		return this._id;
	}

	set id(no) {
		this._id = no;
		$(this._element).attr('id', no);
	}

	show() {
		$(this._element).show();
	}

	hide() {
		$(this._element).hide();
	}
}
