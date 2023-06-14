import React from "react";
import ReactApexChart from "react-apexcharts";

const Bar = ({colorBar,colorBackgroundBar}) => {
  const dataChart = {
    series: [{
      name: 'Daily',
      data: [145],
    },
    // {
    //     name: 'Target',
    //     data: [64],
    //   }
    ],
    options: {
      colors:colorBar,
      chart: {
        height: 350,
        type: 'bar',
        stacked: true,
        stackType:'100'
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed:true,
          borderRadius:10,
          borderRadiusApplication: 'around',
          colors: {
              backgroundBarColors: [colorBackgroundBar],
              backgroundBarOpacity: 1,
              backgroundBarRadius: 10
            }
        },
      },
      yaxis:{
        labels:{
            show:false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Monthly'],
        labels:{
            show:false,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        
      },
      legend: {
        position: 'top',
        show:false
      },
      fill: {
        opacity: 1,
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={dataChart.options}
        series={dataChart.series}
        type="bar"
        height={70}
      />
    </div>
  );
}

export default Bar;
