function binomialDistribution() {
    var n = parseInt($('#n').val());
    var r = parseInt($('#r').val());
    var p = $("#p").val().split(",");

    if(p.length === 2){
    	p = parseFloat(p[0]+"."+p[1])
    }

    if (p < 0 || p > 1) {
        alert("P should be a number between 0 and 1");
        return;
    }
    if (r > n) {
        alert("K should be lass than or equal to N");
        return;
    }
    var nf = 1;
    var rf = 1;
    var nrf = 1;
    for (var k = r; k >= 1; k--) {
        rf = rf * k;
    }
    for (var i = n; i >= 1; i--) {
        nf = nf * i;
    }

    for (var j = (n - r); j >= 1; j--) {
        nrf = nrf * j;
    }
    var npr = nf / nrf;
    var ncr = npr / rf;
    var des = ncr * Math.pow(p, r) * Math.pow((1 - p), (n - r));
    $("#result-decimal").val(Math.round(des * 10000) / 10000);
    $("#result-percent").val((Math.round(des * 10000) / 10000)*100);
}



$(document).ready(function() {
	smoothScroll.init();

	$('#binomialBtn').click(function(){
		binomialDistribution();
	});

});
