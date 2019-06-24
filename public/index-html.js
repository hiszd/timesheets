var getDat = function(dat) {
	var wrapper = document.getElementsByClassName("cont")[0];
	var item = [];
	for(var i=0;i<wrapper.children.length;i++) {
		var datr = JSON.parse(wrapper.children[i].dataset.taskinfo);
		item[i] = datr;
	}

	switch(dat) {
		case "bucket":
		var buckets = [];
		for(i=0;i<item.length;i++) {
			buckets[i] = item[i].bucket;
		}
		return buckets;
		break;
		case "task":
		var tasks = [];
		for(i=0;i<item.length;i++) {
			tasks[i] = item[i].task;
		}
		return tasks;
		break;
		case "status":
		var status = [];
		for(i=0;i<item.length;i++) {
			status[i] = item[i].status;
		}
		return status;
		break;
		case "time":
		var times = [];
		for(i=0;i<item.length;i++) {
			times[i] = item[i].times;
		}
		return times;
		break;
		case "notes":
		var notes = [];
		for(i=0;i<item.length;i++) {
			notes[i] = item[i].notes;
		}
		return notes;
		break;
		case "desc":
		var descs = [];
		for(i=0;i<item.length;i++) {
			descs[i] = item[i].description;
		}
		return descs;
		break;
	}
}
var arrange = function(olda, newa) {
	var arr = [];
	for(var i=0;i<newa.length;i++) {
		for(var j=0;j<olda.length;j++) {
			if(newa[i]==olda[j]) {
				arr[i] = j;
			}
		}
	}
	console.log(arr);
	return arr;
}
var sortCards = function(sort) {
	switch(sort) {
		case "bucketa":
		var buckets = getDat("bucket");
		var arr = arrange(buckets,buckets.sort());
		return arr;
		break;
		case "bucketd":
		var buckets = getDat("bucket");
		var arr = arrange(buckets,buckets.sort().reverse());
		return arr;
		break;
	}
	var wrapper = document.getElementsByClassName("cont");
	var items = wrapper[0].children;
	var elements = document.createDocumentFragment();

	arr.forEach(function(idx) {
		elements.appendChild(items[idx].cloneNode(true));
	});

	wrapper[0].innerHTML = null;
	wrapper[0].appendChild(elements);
}
