import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import './ColumnChart.css'

class ColumnChart extends Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
          name: 'Not interest',
          data: [44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 43]
        }, {
          name: 'Usual',
          data: [13, 23, 20, 8, 13, 27, 13, 23, 20, 8, 13, 27]
        }, {
          name: 'Interest',
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
            }
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
              horizontal: false,
              borderRadius: 10,
              dataLabels: {
                total: {
                  enabled: false,
                //   style: {
                //     fontSize: '13px',
                //     fontWeight: 900
                //   }
                }
              }
            },
          },
          xaxis: {
            // type: 'monthtime',
            categories: ['01', '02', '03', '04',
              '05', '06', '07', '08', '09','10','11','12'
            ],
            // categories:['1','2','3','4','5','6','7','8','9','10','11','12']
          },
          legend: {
            position: 'right',
            offsetY: 40
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
