var add_minutes = (dt, min) => {
	return new Date(dt.getTime() + (minutes*60000));
};
var checkLogin = function (user, passwd) {
	$.ajax({
		url: "http://" + window.location.hostname + ":3000/userlogin/",
		type: 'post',
		data: {password: passwd, user: user},
		dataType: 'json',
		async: true,
		cache: false,
		success: function (data) {
			if(data.result == 1) {
				$("#message-text").removeClass("text-danger");
				$("#message-text").html("Login is Correct!<br />Redirecting Now...");
				console.log("Logged in successfully: "+data.result);
				$("#message-text").show(300);
				setTimeout(() => {
					$("#message-text").hide(200);
					var exdate = add_minutes(new Date(), 30);
					document.cookie="csiloggedin=yes; expires=" + exdate.toUTCString() + "; path=/; domain="+window.location.hostname;

					window.location = "http://" + window.location.hostname + ":3000/?user=hiszd"
				}, 3000);
			} else if(data.result == 0) {
				$("#message-text").addClass("text-danger");
				$("#message-text").html("Incorrect Login.<br /> Please try again.");
				console.log("Login unsuccessful: "+data);
				$("#message-text").show(300);
				setTimeout(() => {$("#message-text").hide(200);}, 3000);
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			//alert('error ' + textStatus + " " + errorThrown);
			$("#message-text").addClass("text-danger");
			$("#message-text").html('Error: ' + textStatus + " " + errorThrown);
			$("#message-text").show(300);
			setTimeout(() => {$("#message-text").hide(200);}, 3000);
		}
	});
};
$(document).ready(function () {
	$("button").click(function() {
		checkLogin(document.getElementById("username").value, document.getElementById("password").value);
	});

	$(".page-wrapper").show();
	$("#page").show();
	setTimeout(showPage, 800);
	//setTimeout(overflow, 100);
});

var showPage = function () {
	$("#loader").animate({
		"opacity": "0"
	}, 400, function () {
		$(this).css("display", "none");
	});
};