function binomialDistribution() {
    var n = parseInt($('#n').val());
    var r = parseInt($('#r').val());
    var p = $("#p").val().split(",");

    if (p.length === 2) {
        p = parseFloat(p[0] + "." + p[1])
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
    $("#result-percent").val((Math.round(des * 10000) / 10000) * 100);
}

var dataTable;
var dvchart;
function variableDistribution() {
    var numbersArray = $('input[name=dvnumbers]').val().split(';');
    var frequencyAndNumbers = new Array;
    var cumulativeFrequency = 0;
    var totalFrequency = 0, relativeFrequency = new Array;
    // [N,Fa,Fr,Fra]
    for (var i = 0; i < numbersArray.length; i++) {
        frequencyAndNumbers[i] = numbersArray[i].split('-');
    }
    for (var i = 0; i < frequencyAndNumbers.length; i++) {
        totalFrequency = totalFrequency + parseFloat(frequencyAndNumbers[i][0]);
    }
    console.log(totalFrequency);
    for (var i = 0; i < frequencyAndNumbers.length; i++) {
        relativeFrequency[i] = Math.round(((100 * parseFloat(frequencyAndNumbers[i][0]) / totalFrequency) * 100) / 100);
    }
    var finalData = new Array;
    var chartData = new Array;
    var chartLabel = new Array;
    for (var i = 0; i < frequencyAndNumbers.length; i++) {
        cumulativeFrequency = cumulativeFrequency + parseFloat(relativeFrequency[i]);
        finalData[i] = [frequencyAndNumbers[i][0], frequencyAndNumbers[i][1], relativeFrequency[i], cumulativeFrequency];
        chartData[i] = [relativeFrequency[i]];
        chartLabel[i] = {label:frequencyAndNumbers[i][1]};
    }
    $('#dvtable .title').contents().remove();
    $('#dvtable .title').append('N of ' + $('input[name=dvname]').val());
    $('#dvtable').slideDown(1000);
    dataTable = $('#dvtable').DataTable({
        paging: false,
        searching: false,
        data: finalData
    });
    // Can specify a custom tick Array.
    // Ticks should match up one for each y value (category) in the series.
    var ticks = [$('input[name=dvname]').val()];
    dvchart = $.jqplot('dvchart', chartData, {
        series: chartLabel,
        seriesColors: ['#45A0B2', '#ACD167', '#FE92CE','#F3BB1C','#EB3D1A'],
        seriesDefaults: {
            renderer: $.jqplot.BarRenderer,
            rendererOptions: {fillToZero: true, varyBarColor: false}
        },
        legend: {
            show: true,
            placement: 'outsideGrid'
        },
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: ticks
            },
            yaxis: {
                pad: 1.05,
            }
        }
    });
}

$(document).ready(function () {
    smoothScroll.init();

    $('#binomialBtn').click(function () {
        binomialDistribution();
    });
    $('#ddBtn').click(function () {
        if ($.fn.dataTable.isDataTable('#dvtable')) {
            dvchart.destroy();
            dataTable.destroy();
        }
        variableDistribution();
    });

});
