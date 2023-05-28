import React from "react";
import ReactApexChart from "react-apexcharts";

const Bar = ({colorBar,colorBackgroundBar, className, text,series}) => {
  const dataChart = {
    series: [{
      data: series,
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
          dataLabels: {
            position: 'top'
          },
          horizontal: true,
          distributed:true,
          borderRadius:5,
          borderRadiusApplication: 'around',
          colors: {
              backgroundBarColors: [colorBackgroundBar],
              backgroundBarOpacity: 1,
              backgroundBarRadius: 5
            }
        },
      },
      yaxis:{
        labels:{
            show:true,
            align:'right',
            offsetX:110,
            offsetY:-20,
            style:{
              fontFamily: 'Josefin Sans,sans-serif',
              fontSize:'14px',
              fontWeight:400,
            }
        },
        floating:true,
      },
      dataLabels: {
        enabled: true,
        offsetX: 50,
        offsetY:-20,
        style:{
          colors: [colorBar],
        }
      },
      xaxis: {
        categories: [text],
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
    <div className={'p-0 m-0'}>
      <ReactApexChart
        options={dataChart.options}
        series={dataChart.series}
        type="bar"
        height={60}
      />
    </div>
  );
}

export default Bar;
