var getDat = function (dat) {
	var wrapper = document.getElementsByClassName("cont")[0],
	item = [];
	if (wrapper.children.length > 0) {
		for (var i = 0; i < wrapper.children.length; i++) {
			var datr = JSON.parse(wrapper.children[i].dataset.taskinfo);
			item[i] = datr;
		}
	}

	switch (dat) {
		case "bucket":
		var buckets = [];
		for (i = 0; i < item.length; i++) {
			buckets[i] = item[i].bucket;
		}
		return buckets;
		case "task":
		var tasks = [];
		for (i = 0; i < item.length; i++) {
			tasks[i] = item[i].task;
		}
		return tasks;
		case "status":
		var status = [];
		for (i = 0; i < item.length; i++) {
			status[i] = item[i].status;
		}
		return status;
		case "time":
		var times = [];
		for (i = 0; i < item.length; i++) {
			times[i] = item[i].times;
		}
		return times;
		case "notes":
		var notes = [];
		for (i = 0; i < item.length; i++) {
			notes[i] = item[i].notes;
		}
		return notes;
		case "desc":
		var descs = [];
		for (i = 0; i < item.length; i++) {
			descs[i] = item[i].description;
		}
		return descs;
		default:
		return item;
	}
};
var arrange = function (oldi, newi) {
	var arr = [];
	for (var i = 0; i < newi.length; i++) {
		for (var j = 0; j < oldi.length; j++) {
			if (newi[i].id == oldi[j].id) {
				arr[i] = j;
			}
		}
	}
	return arr;
};
var sortb = function (a, b) {
	var datA = a.bucket.toUpperCase();
	var datB = b.bucket.toUpperCase();
	var comparison = 0;
	if (datA > datB) {
		comparison = 1;
	} else if (datA < datB) {
		comparison = -1;
	} else if (datA == datB) {
		comparison = 0;
	}
	return comparison;
};
var sortt = function (a, b) {
	var datA = a.task.toUpperCase();
	var datB = b.task.toUpperCase();
	var comparison = 0;
	if (datA > datB) {
		comparison = 1;
	} else if (datA < datB) {
		comparison = -1;
	} else if (datA == datB) {
		comparison = 0;
	}
	return comparison;
};
var sorts = function (a, b) {
	var datA = a.status.toUpperCase();
	var datB = b.status.toUpperCase();
	var comparison = 0;
	if (datA > datB) {
		comparison = 1;
	} else if (datA < datB) {
		comparison = -1;
	} else if (datA == datB) {
		comparison = 0;
	}
	return comparison;
};
var sortti = function (a, b) {
	var datA = a.time.toUpperCase();
	var datB = b.time.toUpperCase();
	var comparison;
	if (datA > datB) {
		comparison = 1;
	} else if (datA < datB) {
		comparison = -1;
	} else if (datA == datB) {
		comparison = 0;
	}
	return comparison;
};
var sortn = function (a, b) {
	var datA = a.notes.toUpperCase();
	var datB = b.notes.toUpperCase();
	var comparison = 0;
	if (datA > datB) {
		comparison = 1;
	} else if (datA < datB) {
		comparison = -1;
	} else if (datA == datB) {
		comparison = 0;
	}
	return comparison;
};
var sortd = function (a, b) {
	var datA = a.description.toUpperCase();
	var datB = b.description.toUpperCase();
	var comparison = 0;
	if (datA > datB) {
		comparison = 1;
	} else if (datA < datB) {
		comparison = -1;
	} else if (datA == datB) {
		comparison = 0;
	}
	return comparison;
};
var sortCards = function (sort) {
	var itemso = getDat(),
	itemsn;
	switch (sort) {
		case "bucketa":
		itemsn = getDat().sort(sortb);
		break;
		case "bucketd":
		itemsn = getDat().sort(sortb).reverse();
		break;
		case "taska":
		itemsn = getDat().sort(sortt);
		break;
		case "taskd":
		itemsn = getDat().sort(sortt).reverse();
		break;
		case "statusa":
		itemsn = getDat().sort(sorts);
		break;
		case "statusd":
		itemsn = getDat().sort(sorts).reverse();
		break;
		case "timea":
		itemsn = getDat().sort(sortti);
		break;
		case "timed":
		itemsn = getDat().sort(sortti).reverse();
		break;
		case "notesa":
		itemsn = getDat().sort(sortn);
		break;
		case "notesd":
		itemsn = getDat().sort(sortn).reverse();
		break;
		case "desca":
		itemsn = getDat().sort(sortd);
		break;
		case "descd":
		itemsn = getDat().sort(sortd).reverse();
		break;
	}
	var arr = arrange(itemso, itemsn);
	var wrapper = document.getElementsByClassName("cont");
	var items = wrapper[0].children;
	var elements = document.createDocumentFragment();
	var groups = {};
	itemsn.forEach(function (item) {
		var list = groups[item.bucket];

		if (list) {
			list.push(item);
		} else {
			groups[item.bucket] = [item];
		}
	});
	wrapper[0].innerHTML = null;
	Object.keys(groups).forEach(function(itm, idx) {
    var cont = new TaskGroup({"tasks": JSON.stringify(groups[itm]), "id": itm});
    $("#cont").append(cont);
  });/*
	arr.forEach(function (idx) {
		elements.appendChild(items[idx].cloneNode(true));
	});
	wrapper[0].innerHTML = null;
	wrapper[0].appendChild(elements);*/
	return 1;
};

function grabForm(ele) {
	var params, formData = {}, url, id;
	params = $(ele).serializeArray();
	formData = {};
	$.each(params, function (i, val) {
		formData[val.name] = val.value;
	});
	return JSON.stringify(formData);
}

var updateTask = function (id) {
	$.ajax({
		url: "http://" + window.location.hostname + ":3000/get/" + id,
		type: 'get',
		dataType: 'json',
		async: true,
		cache: false,
		success: function (data) {
			var card = $("#" + data.id);
			card.attr("data-taskinfo", JSON.stringify(data));
			card.find("#bucket").html(data.bucket);
			card.find("#task").html(data.task);
			card.find("#status").html(data.status);
			card.find("#time").html(data.time);
			card.find("#notes").html(data.notes);
			card.find("#desc").html(data.description);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('error ' + textStatus + " " + errorThrown);
		}
	});
};
var addTask = function () {
	var data = grabForm("#add-task");
	var card = new Task({"object": data});
	console.log(card);
	$("#cont").append(card);
	document.getElementById("add-task").reset();
};
var isOverflown = function (element) {
	return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
};
var overflow = function () {
	$(".list-group-item").on("mouseenter mouseleave",function () {
		if(!$(this).hasClass("overhover")) {
			if (isOverflown(this, $(this).children("em"))) {
				$(this).addClass("overhover");
			}
		} else {
			$(this).removeClass("overhover");
		}
	});
}
function scrollHorizontally(e) {
  e = window.event || e;
  var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
//  document.getElementById('cont').scrollLeft -= (delta * 40); // Multiplied by 40
  this.scrollBy({top: ((delta * 40)*-1), left: 0, behavior: 'smooth'});
  e.preventDefault();
}

function scrollVertically(e) {
  e = window.event || e;
  var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
  var changescroll = this.scrollTop;
  changescroll += (delta * 80); // Multiplied by 40
  this.scrollBy({top: ((delta * 100)*-1), left: 0, behavior: 'smooth'});
  e.preventDefault();
}
$(document).ready(function () {
	if ($("#cont").find("#noitem").length==0) {
		sortCards($("#sort").val());
	}
	$("#editModal").on("show.bs.modal", function (event) {
		var button = $(event.relatedTarget);

		var card = $("#" + button.data("id"));
		$(this).attr("data-id", button.data("id"));
		$(this).find(".modal-title").text("Edit \"" + card.find("#task").text() + "\"");
		$(this).find("#task").val(card.find("#task").text());
		$(this).find("#bucket").val(card.find("#bucket").text());
		$(this).find("#status").val(card.find("#status").text());
		$(this).find("#description").val(card.find("#desc").text());
		$(this).find("#time").val(card.find("#time").text());
		$(this).find("#notes").val(card.find("#notes").text());
	});
	$("#editModal").find("#submit").on("click", function () {
		console.log("Clicked");
		$("#editModal").find("form").submit();
	});
	$("#addModal").find("#submit").on("click", function () {
		console.log("Clicked");
		$("#addModal").find("form").submit();
	});

	function sendEditData() {
		console.log("Sending Data");
		var XHR = new XMLHttpRequest();

		// Bind the FormData object and the form element
		//var FD = new FormData($("#edit-task").get(0));
		var FD, id;
		FD = grabForm("#edit-task");
		id = $("#editModal").data("id");

		// Define what happens on successful data submission
		XHR.addEventListener("load", function () {
			console.log("Success");
		});

		// Define what happens in case of error
		XHR.addEventListener("error", function () {
			alert('Oops! Something went wrong.');
		});

		// Set up our request
		XHR.open("POST", "http://" + window.location.hostname + ":3000/edit" + id);
		XHR.setRequestHeader('Content-Type', 'application/json');
		// The data sent is what the user provided in the form
		console.log(FD);
		XHR.send(FD);
	}

	function sendAddData() {
		console.log("Sending Add Data");
		var XHR = new XMLHttpRequest();

		// Bind the FormData object and the form element
		//var FD = new FormData($("#edit-task").get(0));
		var FD, id;
		FD = grabForm("#add-task");

		// Define what happens on successful data submission
		XHR.addEventListener("load", function () {
			console.log("Success");
		});

		// Define what happens in case of error
		XHR.addEventListener("error", function () {
			alert('Oops! Something went wrong.');
		});

		// Set up our request
		XHR.open("POST", "http://" + window.location.hostname + ":3000/add");
		XHR.setRequestHeader('Content-Type', 'application/json');
		// The data sent is what the user provided in the form
		console.log(FD);
		XHR.send(FD);
	}


	$("#edit-task").on("submit", function (event) {
		event.preventDefault();

		sendEditData();
		updateTask($("#editModal").data("id"));
		$("#editModal").modal("hide");
	});
	$("#add-task").on("submit", function (event) {
		event.preventDefault();

		sendAddData();
		addTask();
		$("#addModal").modal("hide");
	});
	$('#myModal').on('hidden.bs.modal', function () {
		setTimeout(document.getElementById("add-task").reset(),700);
	});
	$(".page-wrapper").show();
	$("#page").show();
	setTimeout(showPage, 800);
	setTimeout(overflow, 100);
  if (document.querySelector('.group').addEventListener) {
    var elements = document.querySelectorAll('.group');
    for (const element of elements) {
      // IE9, Chrome, Safari, Opera
      element.addEventListener("mousewheel", scrollVertically, false)
      // Firefox
      element.addEventListener("DOMMouseScroll", scrollVertically, false);
    }
  } else {
    var elements = document.querySelectorAll('.group');
    // IE 6/7/8
    for (const element of elements) {
      element.attachEvent("onmousewheel", scrollVertically);
    }
  }

  if (document.getElementById('cont').addEventListener) {
    // IE9, Chrome, Safari, Opera
    document.getElementById('cont').addEventListener("mousewheel", scrollHorizontally, false);
    // Firefox
    document.getElementById('cont').addEventListener("DOMMouseScroll", scrollHorizontally, false);
  } else {
    // IE 6/7/8
    document.getElementById('cont').attachEvent("onmousewheel", scrollHorizontally);
  }
});

var showPage = function () {
	$("#loader").animate({"opacity": "0"}, 400, function() {
		$(this).css("display","none");
	});
};
