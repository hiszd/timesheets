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
		default:
		return item;
		break;
	}
}
var arrange = function(oldi, newi) {
	console.log(oldi);
	console.log(newi);
	var arr = [];
	for(var i=0;i<newi.length;i++) {
		for(var j=0;j<oldi.length;j++) {
			if(newi[i].id==oldi[j].id) {
				arr[i] = j;
			}
		}
	}
	return arr;
}
var sortb = function(a,b) {
	const datA = a.bucket.toUpperCase();
	const datB = b.bucket.toUpperCase();
	let comparison = 0;
	if (datA > datB) {
		comparison = 1;
	} else if (datA < datB) {
		comparison = -1;
	} else if (datA == datB) {
		comparison = 0;
	}
	return comparison;
}
var sortt = function(a,b) {
	const datA = a.task.toUpperCase();
	const datB = b.task.toUpperCase();
	let comparison = 0;
	if (datA > datB) {
		comparison = 1;
	} else if (datA < datB) {
		comparison = -1;
	} else if (datA == datB) {
		comparison = 0;
	}
	return comparison;
}
var sorts = function(a,b) {
	const datA = a.status.toUpperCase();
	const datB = b.status.toUpperCase();
	let comparison = 0;
	if (datA > datB) {
		comparison = 1;
	} else if (datA < datB) {
		comparison = -1;
	} else if (datA == datB) {
		comparison = 0;
	}
	return comparison;
}
var sortti = function(a,b) {
	const datA = a.time.toUpperCase();
	const datB = b.time.toUpperCase();
	if (datA > datB) {
		comparison = 1;
	} else if (datA < datB) {
		comparison = -1;
	} else if (datA == datB) {
		comparison = 0;
	}
	return comparison;
}
var sortn = function(a,b) {
	const datA = a.notes.toUpperCase();
	const datB = b.notes.toUpperCase();
	let comparison = 0;
	if (datA > datB) {
		comparison = 1;
	} else if (datA < datB) {
		comparison = -1;
	} else if (datA == datB) {
		comparison = 0;
	}
	return comparison;
}
var sortd = function(a,b) {
	const datA = a.description.toUpperCase();
	const datB = b.description.toUpperCase();
	let comparison = 0;
	if (datA > datB) {
		comparison = 1;
	} else if (datA < datB) {
		comparison = -1;
	} else if (datA == datB) {
		comparison = 0;
	}
	return comparison;
}
var sortCards = function(sort) {
	switch(sort) {
		case "bucketa":
		var itemso = getDat();
		var itemsn = getDat().sort(sortb);
		var arr = arrange(itemso,itemsn);
		break;
		case "bucketd":
		var itemso = getDat();
		var itemsn = getDat().sort(sortb).reverse();
		var arr = arrange(itemso,itemsn);
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
	return 1;
}
