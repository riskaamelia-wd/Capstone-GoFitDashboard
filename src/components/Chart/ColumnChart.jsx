import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import './Chart.css'

class ColumnChart extends Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
          name: 'Easy',
          data: [44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 43]
        }, {
          name: 'Usual',
          data: [13, 23, 20, 8, 13, 27, 13, 23, 20, 8, 13, 27]
        }, {
          name: 'Exhausted',
          data: [11, 17, 15, 15, 21, 14, 11, 17, 15, 15, 21, 14]
        }],
        options: {
          chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            },
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              columnWidth: '20%',
              horizontal: false,
              // borderRadius: [10, 20, 15, 25, 5, 30, 0, 35, 40, 45, 50, 55],
              borderRadius: 10,
              // borderRadiusApplication: 'around',
              borderRadiusWhenStacked:'last',
              dataLabels: {
                total: {
                  enabled: false,
                }
              }
            },
          },
          grid: {
            xaxis: {
              lines: {
                show: false
              }
            },
            yaxis:{
                lines:{
                    show:false
                }
            }
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: ['01', '02', '03', '04',
              '05', '06', '07', '08', '09','10','11','12'
            ],
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
          },
          legend: {
            position: 'top',
            offsetY: 20,
            offsetX: '10px',
            
          },
          fill: {
            opacity: 1
          },
        },
      
      
      };
    }

  

    render() {
      return (
        <div className="columnChart mb-5 mt-5">
            <p className="ps-3 pt-3 p-0 m-0 fs-3 fw-semibold">Satisfaction Level</p>
            <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
            </div>
        </div>
        



      );
    }
  }

//   const domContainer = document.querySelector('#app');
//   ReactDOM.render(React.createElement(ApexChart), domContainer);
export default ColumnChart
