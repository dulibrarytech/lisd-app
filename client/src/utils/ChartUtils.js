

export class ChartUtils {

	constructor() {
		 // Chart configuration
        this.chartOptions = {

            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontSize: 30
                    }
                }]
            }
        }
	}

	renderClassSingleChart(labelArray, dataArray) {	// This does not know about timeframes.  Sort external to this function?

        var config = {

		    labels: labelArray,
		    datasets: [
		        {
		            fillColor: "#79D1CF",
		            strokeColor: "#79D1CF",
		            data: dataArray
		        }
		    ]
		};

        var ctx = document.getElementById("results-chart").getContext("2d");
		var myBar = new Chart(ctx).Bar(config, {
		    showTooltips: false,
		    onAnimationComplete: function () {

		        var ctx = this.chart.ctx;
		        ctx.font = this.scale.font;
		        ctx.fillStyle = this.scale.textColor
		        ctx.textAlign = "center";
		        ctx.textBaseline = "bottom";

		        this.datasets.forEach(function (dataset) {
		            dataset.bars.forEach(function (bar) {
		                ctx.fillText(bar.value, bar.x, bar.y - 5);
		            });
		        })
		    }
		});
	}

	// renderClassSingleChart(resultData,  resultListType, timeframe) {	// This does not know about timeframes.  Sort external to this function?
		
	// 	var months = [], quarters = [];
	// 	var data = [];

	// 	var config = {};
	// 	if(resultListType == "Total") {

	// 		data = [resultData.year.total];

 //            config = {
	// 		    labels: ["Total Classes"],
	// 		    datasets: [
	// 		        {
	// 		            fillColor: "#79D1CF",
	// 		            strokeColor: "#79D1CF",
	// 		            data: data
	// 		        }
	// 		    ]
	// 		};
 //        }
 //        else if(resultListType == "Month") {

 //        	// Get months and data from resultObject

 //            config = {
	// 		    labels: months,
	// 		    datasets: [
	// 		        {
	// 		            fillColor: "#79D1CF",
	// 		            strokeColor: "#79D1CF",
	// 		            data: data
	// 		        }
	// 		    ]
	// 		};
 //        }
 //        else if(resultListType == "Quarter") {

 //        	// Get quarters and data from resultObject

 //            config = {
	// 		    labels: quarters,
	// 		    datasets: [
	// 		        {
	// 		            fillColor: ["#79D1CF"],
	// 		            strokeColor: "#79D1CF",
	// 		            data: data
	// 		        }
	// 		    ]
	// 		};
 //        }

 //        var ctx = document.getElementById("results-chart").getContext("2d");
	// 	var myBar = new Chart(ctx).Bar(config, {
	// 	    showTooltips: false,
	// 	    onAnimationComplete: function () {

	// 	        var ctx = this.chart.ctx;
	// 	        ctx.font = this.scale.font;
	// 	        ctx.fillStyle = this.scale.textColor
	// 	        ctx.textAlign = "center";
	// 	        ctx.textBaseline = "bottom";

	// 	        this.datasets.forEach(function (dataset) {
	// 	            dataset.bars.forEach(function (bar) {
	// 	                ctx.fillText(bar.value, bar.x, bar.y - 5);
	// 	            });
	// 	        })
	// 	    }
	// 	});
	// }

	getSubsortChartConfig(resultListType, statisticsType) {

	}
}