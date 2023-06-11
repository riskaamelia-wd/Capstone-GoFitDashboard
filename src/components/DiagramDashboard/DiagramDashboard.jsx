import React from "react";
import ReactApexChart from "react-apexcharts"
import "../DiagramDashboard/DiagramDashboard.css"

class DiagramDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [90, 90, 80],
      options: {
        chart: {
          width: 380,
          type: 'polarArea',
          dropShadow: {
            enabled: true,
            left: 0,
            blur: 2,
            opacity: 0.25
          }
        },
        labels: ['Offline Class', 'Online Class', 'Just Open App'],        
        fill: {
          opacity: 1
        },
        stroke: {
          width: 1,
          colors: undefined
        },
        yaxis: {
          show: false
        },
        legend: {
            position: 'right',
            fontFamily: 'Josephine, sans-serif ',
            markers: {
                width: "20px",
                height: "20px",
                shape: 'square', // Mengubah ikon menjadi persegi
                radius: "2px", // Mengatur radius border
            },
        },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0
            },
            spokes: {
              strokeWidth: 0
            },
          },
          
        },
      },
    };
  }

  render() {
    return (
      <div className="DiagramDashboard" id="DiagramDashboard">
        <h4 className="Diagram-text">Diagram</h4>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="polarArea" width={450} />
        </div>
      </div>
    );
  }
}

export default DiagramDashboard;
