class task {
	constructor(selector) {
		this._element = document.getElementById(selector);
	}

	// Functions

	colorMe() {
		this._element.style.backgroundColor = "red";
	}

	moveMe(x) {
		this._element.style.marginTop = x;
	}
}
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
	itemso = getDat();
	switch(sort) {
		case "bucketa":
		var itemsn = getDat().sort(sortb);
		break;
		case "bucketd":
		var itemsn = getDat().sort(sortb).reverse();
		break;
		case "taska":
		var itemsn = getDat().sort(sortt);
		break;
		case "taskd":
		var itemsn = getDat().sort(sortt).reverse();
		break;
		case "statusa":
		var itemsn = getDat().sort(sorts);
		break;
		case "statusd":
		var itemsn = getDat().sort(sorts).reverse();
		break;
		case "timea":
		var itemsn = getDat().sort(sortti);
		break;
		case "timed":
		var itemsn = getDat().sort(sortti).reverse();
		break;
		case "notesa":
		var itemsn = getDat().sort(sortn);
		break;
		case "notesd":
		var itemsn = getDat().sort(sortn).reverse();
		break;
		case "desca":
		var itemsn = getDat().sort(sortd);
		break;
		case "descd":
		var itemsn = getDat().sort(sortd).reverse();
		break;
	}
	var arr = arrange(itemso,itemsn);
	var wrapper = document.getElementsByClassName("cont");
	var items = wrapper[0].children;
	var elements = document.createDocumentFragment();
	var groups = { };
	itemsn.forEach(function(item){
		var list = groups[item.bucket];

		if(list){
			list.push(item);
		} else{
			groups[item.bucket] = [item];
		}
	});
	console.log(groups);/*
	groups.forEach(function(idx) {
		var cont = $([
			"<div class='bg-secondary'>",
			"</div>"
		].join("\n"));
		cont.appendChild(items[idx].cloneNode(true));
		elements.appendChild(cont);
	});*/
	arr.forEach(function(idx) {
		elements.appendChild(items[idx].cloneNode(true));
	});
	wrapper[0].innerHTML = null;
	wrapper[0].appendChild(elements);
	return 1;
}
var updateTask = function(id) {
	$.ajax({
		url: "http://localhost:3000/get/"+id,
		type: 'get',
		dataType: 'json',
		async: true,
		cache: false,
		success: function(data) {
			var card = $("#"+data.id);
			card.attr("data-taskinfo", JSON.stringify(data));
			card.find("#bucket").html(data.bucket);
			card.find("#task").html(data.task);
			card.find("#status").html(data.status);
			card.find("#time").html(data.time);
			card.find("#notes").html(data.notes);
			card.find("#desc").html(data.description);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert('error ' + textStatus + " " + errorThrown);
		}
	});
}
$(document).ready(function(){
	sortCards($("#sort").val());
	$("#editModal").on("show.bs.modal", function(event){
		var button = $(event.relatedTarget);

		var card = $("#"+button.data("id"));
		$(this).attr("data-id", button.data("id"));
		$(this).find(".modal-title").text("Edit \""+card.find("#task").text()+"\"");
		$(this).find("#task").val(card.find("#task").text());
		$(this).find("#bucket").val(card.find("#bucket").text());
		$(this).find("#status").val(card.find("#status").text());
		$(this).find("#description").val(card.find("#desc").text());
		$(this).find("#time").val(card.find("#time").text());
		$(this).find("#notes").val(card.find("#notes").text());
	});
	$("#editModal").find("#submit").on("click", function(event){
		console.log("Clicked");
		$("#editModal").find("form").submit();
	});
	function sendData() {
		console.log("Sending Data");
		var XHR = new XMLHttpRequest();

		// Bind the FormData object and the form element
		//var FD = new FormData($("#edit-task").get(0));
		var params = $("#edit-task").serializeArray();
		formData = {};
		$.each(params, function(i, val) {
			formData[val.name] = val.value;
		});
		var FD = JSON.stringify(formData)

		// Define what happens on successful data submission
		XHR.addEventListener("load", function(event) {
			console.log("Success");
		});

		// Define what happens in case of error
		XHR.addEventListener("error", function(event) {
			alert('Oops! Something went wrong.');
		});

		// Set up our request
		XHR.open("POST", "http://localhost:3000/edit/"+$("#editModal").data("id"));
		XHR.setRequestHeader('Content-Type', 'application/json')
		// The data sent is what the user provided in the form
		console.log(FD);
		XHR.send(FD);
	}

	$("#edit-task").on("submit", function (event) {
		event.preventDefault();

		sendData();
		updateTask($("#editModal").data("id"));
		$("#editModal").modal("hide");
	});
	setTimeout(showPage,1000);
});
var showPage = function() {
	$("#loader").hide();
	$(".page-wrapper").show();
	$("#page").show();
}
