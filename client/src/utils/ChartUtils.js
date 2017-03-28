

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

        this.numOfStudentTypes = 4;	// settings
        this.barColorScheme = ['#C1F3F9', '#B9DBA6', '#F2E4C7', '#DBAAAB', '#CAC1F9'];	// Kuler scheme
	}

	renderClassSingleChart(labelArray, dataArray) {	// This does not know about timeframes.  Sort external to this function?
		//console.log("H")
        var config = {

		    labels: labelArray,
		    datasets: [
		        {
		            fillColor: "#79D1CF",
		            strokeColor: "#79D1CF",
		            data: dataArray,
		            options: {
				        legend: {
				            display: true,
				            labels: {
				                fontColor: 'rgb(255, 99, 132)'
				            }
				        }
					}
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

	renderStudentSingleChart(labelArray, dataArray) {

		var colorIndex = 0;
		var barColors = this.barColorScheme;

		var dataSetArray = [], newArray = [];
		var dataSet = {};
		var value;
		for(var i=0; i<this.numOfStudentTypes; i++) {
			dataSet = {};
			newArray = [];
			for(var j in dataArray) {
				newArray[j] = dataArray[j][i];
			}
			dataSet['fillColor'] = barColors[i];
			dataSet['data'] = newArray;
			dataSetArray.push(dataSet);		
		}

		var config = {

		    labels: labelArray,
		    datasets: dataSetArray
		};

        var ctx = document.getElementById("results-chart").getContext("2d");
		var myBar = new Chart(ctx).Bar(config, {
		    showTooltips: false,
		    // tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>kb",
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
		console.log("LEGEND: " + myBar.generateLegend());
		// var legendHolder = document.createElement('div');
		// legendHolder.innerHTML = myBar.generateLegend();
		// document.getElementById('legend').appendChild(legendHolder.firstChild);
	}

	// renderClassSubsortChart(labelArray, dataArray) {

	// }

	// renderStudentSubsortChart(labelArray, dataArray) {
		
	// }
}