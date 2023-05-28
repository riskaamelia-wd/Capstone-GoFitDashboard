import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import "./Chart.css";
// import { type } from "os";
import bar1 from '../../assets/img/bar1.png'
import bar2 from '../../assets/img/bar2.png'
import bar3 from '../../assets/img/bar3.png'
import bar4 from '../../assets/img/bar4.png'
import bar5 from '../../assets/img/bar5.png'
import bar6 from '../../assets/img/bar6.png'

const ColumnChartWithDataLabel = ({series, text}) => {
  const dataChart = {
    series:series,
    options: {
      chart: {
        height: 200,
        type: "bar",
      },
      plotOptions: {
        bar: {
          columnWidth:'50%',
            borderRadius: 2,
          distributed:true,
          dataLabels: {
            position: "top",
          },
        },
      },
      fill:{
        type:'image',
        image:{
          src:[`${bar1}`,`${bar2}`,`${bar3}`,`${bar4}`,`${bar5}`,`${bar6}`],
          style:{
            height:'100',
            width:'fit-content'
          }
        }
      },
      dataLabels: {
        enabled: false,
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

      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
    },
  };
  console.log(series);
  return (
    <>
      <div
        className="mt-4"
        style={{
          backgroundColor: "var(--Neutral-White-0)",
          borderRadius: "32px",
        }}>
        <p className="fw-bold fs-5 ms-5 mb-0 pt-3">{text}</p>
        <div style={{ borderRadius: "32px" }} className="p-2 pe-4">
          <div id="chart" style={{ height: "100%", maxHeight: "100%" }}>
            <ReactApexChart
              options={dataChart.options}
              series={dataChart?.series}
              type="bar"
              height={200}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ColumnChartWithDataLabel


// const series =  [
//   {
//     name: "Online Class",
//     data: [100, 12, 40, 90, 150, 90],
//   },
// ]