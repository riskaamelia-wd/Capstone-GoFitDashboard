import React, { Component } from "react";
// import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import './RadialBar.css'

class RadialBar extends Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [37],
        options: {
          chart: {
            height: 350,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '60%',
              }
            },
          },
          labels: ['Participant'],
          stroke:{
            lineCap:'round'
          },
        },
      
      
      };
    }

  

    render() {
      return (
        <div className="radialBarCard p-5">
          <p className="fw-bold fs-1">Advanced</p>
          <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={350} />
          </div>
        </div>
        

);
}
}

// const domContainer = document.querySelector('#app');
// ReactDOM.render(React.createElement(ApexChart), domContainer);

export default RadialBar