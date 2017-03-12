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

	getSingleChartConfig(resultListType, statisticsType) {
		var config = {};
		if(resultListType == "Total") {

            config = {

              type: 'bar',
              data: {
                labels: ['Classes by Year'],
                datasets: [{
                  label: 'Number of Classes',
                  data: [12],
                  backgroundColor: "rgba(153,255,51,0.4)"
                }]
              },
              options: this.chartOptions
            }
        }
        else if(resultListType == "Month") {

            config = {

              type: 'bar',
              data: {
                labels: ['Classes by Month'],
                datasets: [{
                  label: 'Number of Classes',
                  data: [12],
                  backgroundColor: "rgba(153,255,51,0.4)"
                }]
              },
              options: this.chartOptions
            }
        }
        else if(resultListType == "Quarter") {
            config = {

              type: 'bar',
              data: {
                labels: ['Classes by Quarter'],
                datasets: [{
                  label: 'Number of Classes',
                  data: [12],
                  backgroundColor: "rgba(153,255,51,0.4)"
                }]
              },
              options: this.chartOptions
            }
        }

        return config;
	}

	getSubsortChartConfig(resultListType, statisticsType) {

	}
}