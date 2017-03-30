

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
		
		var barWidthPct = 0.8;
		if(dataArray.length == 1) {
			barWidthPct = 0.2
		}

		console.log("RCH");

		var data = {
		    labels: labelArray,
		    datasets: [{
		        label: null,
		        backgroundColor: "#C1F3F9",
		        borderColor: "rgba(75,192,192,1)",
		        data: dataArray,
		    }]
		};

		console.log(data);

		var ctx = document.getElementById("results-chart");

		var myChart = new Chart(ctx, {
		    type: 'bar',
		    data: data,
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero: true,
		                    fontSize: 25,
		                    stepSize : 1,
		                }
		            }],
		            xAxes: [{
		                // Change here
		            	barPercentage: barWidthPct,
		            	ticks: {
		                    fontSize: 25
		                }
		            }]
		        },
	            legend: {
	            	display: false
	            },
	            tooltips: {
	            	enabled: false
	            }
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

			// dataSet['fillColor'] = barColors[i];
			// dataSet['data'] = newArray;

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

	}
}