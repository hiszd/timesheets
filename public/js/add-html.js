$(document).ready(function(){
	setTimeout(showPage,1000);
});
var showPage = function() {
	$("#loader").hide();
	$(".page-wrapper").show();
	$("#page").show();
}
