

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

        //this.numOfStudentTypes = 4;	// settings
        this.studentTypes = ["Undergraduates", "Graduates", "Faculty", "Other"]
        this.barColorScheme = ['#C1F3F9', '#B9DBA6', '#F2E4C7', '#DBAAAB', '#CAC1F9'];	// Kuler scheme
        this.barBorderColorScheme = ['#769598', '#687A5C', '#918978', '#7A5F60', '#7B7698'];
	}

	getMaxOfArray(numArray) {
	  return Math.max.apply(null, numArray);
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

		console.log("---RENDERING---");

		var barWidthPct = 0.9;
		// if(dataArray.length == 1) {
		// 	barWidthPct = 0.2
		// }

		var dataSetArray = [], newArray = [];
		var dataSet = {};
		var value;
		for(var i=0; i<this.studentTypes.length; i++) {
			dataSet = {};
			newArray = [];

			for(var j in dataArray) {
				newArray[j] = dataArray[j][i];
			}
			dataSet['data'] = newArray;
			dataSet['label'] = this.studentTypes[i];
			dataSet['backgroundColor'] = this.barColorScheme[i];
			dataSet['borderColor'] = this.barBorderColorScheme[i];

			dataSetArray.push(dataSet);		
		}

		var data = {

		    labels: labelArray,
		    datasets: dataSetArray
		};

		// Find largest value in array, to set Y ticks
		var maxVal = 0, tickInc = 1;
		for(var i in dataSetArray) {
			for(var j in dataArray[i]) {
				if(dataArray[i][j] > maxVal) {
					maxVal = dataArray[i][j];
				}
			}
		}
		// If odd number, make it even so no non-integers are displayed
		if(tickInc % 2 == 0) {
			tickInc = maxVal / 8;
		}
		else {
			tickInc = (maxVal+1) / 8;
		}


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
		                    stepSize : tickInc,
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
	            	display: true,
	            	position: 'bottom',
	            	labels: {
	            		fontSize: 25,
	            		padding: 40
	            	}
	            },
	            tooltips: {
	            	enabled: false
	            }
		    }
		});
	}
}