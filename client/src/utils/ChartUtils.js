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

	renderClassSingleChart(resultData,  resultListType, timeframe) {	// This does not know about timeframes.  Sort external to this function?
		
		var months = [], data = [];
		if(timeframe == "Fiscal") {
			months = 
		}

		var config = {};
		if(resultListType == "Total") {

            config = {
			    labels: ["Total Classes"],
			    datasets: [
			        {
			            fillColor: "#79D1CF",
			            strokeColor: "#79D1CF",
			            data: [120]
			        }
			    ]
			};
        }
        else if(resultListType == "Month") {

        	if(timeframe == "Fiscal") {
				months = ["July", "August", "September", "October", "November", "December", "January", "February", "March", "April", "May", "June"];
			}
			else if(timeframe == "Academic") {
				months = ["September", "October", "November", "December", "January", "February", "March", "April", "May", "June", "July", "August"];
			}
			else {
				months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			}

            config = {
			    labels: months,
			    datasets: [
			        {
			            fillColor: "#79D1CF",
			            strokeColor: "#79D1CF",
			            data: [60, 80, 81, 56, 55, 40, 25, 33, 15, 70, 23, 12]
			        }
			    ]
			};
        }
        else if(resultListType == "Quarter") {

            config = {
			    labels: ["July", "August", "September", "October"],
			    datasets: [
			        {
			        	label: "",
			            fillColor: ["#79D1CF"],
			            strokeColor: "#79D1CF",
			            data: [60, 80, 81, 56]
			        }
			    ]
			};
        }

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

	getSubsortChartConfig(resultListType, statisticsType) {

	}
}