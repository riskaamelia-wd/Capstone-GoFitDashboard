import React from "react";
import ReactApexChart from "react-apexcharts"
import "../StatisticDashboard/StatisticDashboard.css"
//Belum Selesai
class StatisticDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                data: [21, 22, 10, 28, 16, 21, 13, 30]
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'bar',
                    events: {
                        click: function (chart, w, e) {
                        }
                    }
                },
                labels: ['Offline Class', 'Online Class', 'Just Open App'],
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                        distributed: true,
                        borderRadius: 15
                    }
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    position: "top",
                    horizontalAlign: "left",
                    labels: {
                      colors: "#ffffff",
                      useSeriesColors: false,
                      markers: {
                        fillColors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"]
                      }
                    }
                  },
                xaxis: {
                    categories: [
                        ['John', 'Doe'],
                        ['Joe', 'Smith'],
                        ['Jake', 'Williams'],
                            
                    ],
                    labels: {
                        show: false,
                        style: {

                            fontSize: '12px'
                        }
                    }
                },
                yaxis: {
                    show: false,
                    labels: {
                        show: false
                    }
                },
                grid: {
                    show: false
                }
            },


        };
    }



    render() {
        return (
            <div className="StatisticDashboard" id="StatisticDashboard">
                <h4 className="Statistic-text">Statistic</h4>
                <div id="statistic">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
                </div>
            </div>


        );
    }
}

export default StatisticDashboard
