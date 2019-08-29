class SVG {
	constructor(argmap) {
		if (argmap.selector) {
			this._element = $(argmap.selector);
			this._id = this._element.attr("id");
			this._drawnElements = [];
			this._element.children("path, rect, use, circle").forEach(function (itm, idx) {
				this._drawnElements.push(itm);
			});
			if (argmap.clickToggle && argmap.clickState && argmap.clickTime) {

			}
			return this;
		} if (argmap.drawnElements && argmap.id) {
		} if (argmap.element) {
			this._element = $(argmap.element);
			this._id = this._element.attr("id");
			this._drawnElements = [];
			// $(this._element).find("path, rect, use, circle").forEach(function (itm, idx) {
			// this._drawnElements.push(itm);
			// });
			if (argmap.clickToggle && argmap.clickState) {
				var state = argmap.clickState;  //JSON.parse(argmap.clickState);
				$(this._element).click(() => {
					Object.keys(state).forEach((itm, idx) => {
						console.log(itm);
						console.log($(this._element).find(itm));
						var ele = $(this._element).find(itm);
						ele.css(state[itm]);
					});
				});
			}
			return this;
		}
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
