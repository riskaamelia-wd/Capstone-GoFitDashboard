/* eslint-disable react/prop-types */
import Cover from "../../elements/Card/Cover";
import member1 from "../../assets/icons/Members 1.svg";
import "./ManageMembership.css";
import test from "../../assets/test.svg";
import TagStatus from "../../elements/Tag/TagStatus";
import InputSearch from "../../elements/InputSearch/InputSearch";
import { useEffect, useMemo, useState } from "react";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
import TagMonthYear from "../../elements/Tag/TagMonthYear";
import ReactApexChart from "react-apexcharts";
import { Datepicker } from "@mobiscroll/react";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import useAxios from "../../api/useAxios";
import { membershipApi } from "../../api/Api";
const ManageMembership = () => {
  const dummydata2 = [
    {
      img: test,
      receiver: "Emma Ryan rj",
      type: "3 month",
      status: "active",
      date: "2023-4-16",
      amount: "99,860",
    },
    {
      img: test,
      receiver: "Emma Ryan rj",
      type: "1 month",
      status: "expired",
      date: "2023-4-16",
      amount: "99,860",
    },
    {
      img: test,
      receiver: "Emma Ryan rj",
      type: "1 year",
      status: "pending",
      date: "2023-4-16",
      amount: "99,860",
    },
    {
      img: test,
      receiver: "Emma Ryan rj",
      type: "3 month",
      status: "active",
      date: "2023-4-16",
      amount: "99,860",
    },
    {
      img: test,
      receiver: "Emma Ryan rj",
      type: "1 month",
      status: "expired",
      date: "2023-4-16",
      amount: "99,860",
    },
    {
      img: test,
      receiver: "Emma Ryan rj",
      type: "1 year",
      status: "pending",
      date: "2023-4-16",
      amount: "99,860",
    },
  ];
  const { response, isLoading } = useAxios({
    api: membershipApi,
    method: "get",
    url: "/membership",
  });
  const [inputSearch, setInputSearch] = useState("");
  const [pickedDate, setPickedDate] = useState();
  const [filteredDate, setFilteredDate] = useState([]);
  const [filteredOneMonth, setFilteredOneMonth] = useState(0);
  const [filteredThreeMonth, setFilteredThreeMonth] = useState(0);
  const [filteredOneYear, setFilteredOneYear] = useState(0);
  // const [filteredrangedata, setFilteredRangeData] = useState([]);
  const [data, setData] = useState([]);
  const [dataMiniCard, setDataMiniCard] = useState([]);
  const navigate = useNavigate();
  const opt = {
    series: [
      {
        name: "1 month",
        data: [0, 1, 2, 3, 4, 1, 5],
      },
      {
        name: "3 month",
        data: [0, 3, 4, 1, 0, 5, 6],
      },
      {
        name: "1 year",
        data: [3, 1, 4, 2, 1, 8, 5],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        type: "line",
        // zoom: {
        //   enabled: false,
        // },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      grid: {
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yaxis: {
        forceNiceScale: true,
        labels: {
          formatter: function (val) {
            return val?.toFixed(0);
          },
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
      colors: ["#6666FF", "#FFC166", "#FF7F00"],
    },
  };
  const MiniCard = ({ img, name, date, tag }) => {
    return (
      <>
        <div className="MiniCard">
          <div className="row">
            <div className="col-2">
              <img src={img} alt={name} width={"50vw"} />
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-12">
                  <div className="text-dark fw-semibold">{name}</div>
                </div>
                <div className="col-12">
                  <div className="text-secondary">{date}</div>
                </div>
              </div>
            </div>
            <div className="col-4 text-end">
              <div className="mt-2">{tag}</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const placeholderpicker = { placeholder: "Insert the date" };

  const onChangePickedDate = (e) => {
    const valuedate = e.value;
    setPickedDate(valuedate);
    const StartDate = moment(valuedate[0]).format("YYYY-M-DD");
    const EndDate = moment(valuedate[1]).format("YYYY-M-DD");

    const FilteredPickedDate = data.filter(
      (data) => StartDate <= data.date && data.date <= EndDate
    );
    const TempOneMonth = FilteredPickedDate.filter(
      (data) => data.type === "1 month"
    );
    const TempThreeMonth = FilteredPickedDate.filter(
      (data) => data.type === "3 month"
    );
    const TempOneYear = FilteredPickedDate.filter(
      (data) => data.type === "1 year"
    );

    console.log(TempOneMonth);
    console.log(TempThreeMonth);
    console.log(TempOneYear);
    setFilteredDate(
      FilteredPickedDate.map((data) => moment(data.date).format("ddd"))
    );
  };
  const onSortingDate = () => {
    data.sort((a, b) => {
      if (new Date(a.date) < new Date(b.date)) {
        return -1;
      }
      //  (new Date(a.date) < new Date(a.date)) {
      //   return 1;
      // } else {
      //   return 0;
      // }
    });
    // setData(sorted);
    console.log(data.map((e) => e.date));
  };
  // pakai use effect
  // useEffect()
  useEffect(() => {
    if (response !== null) {
      const sorted = response.sort(
        (objA, objB) => Number(objB.date) - Number(objA.date)
      );
      setData(response);
      setDataMiniCard(sorted);
    }
  }, [response]);
  return (
    <>
      {/* {console.log(filteredDate)} */}
      <div className="container mt-5">
        <div className="mb-5">
          <Cover
            // list2={"list2"}
            // list3={"list3"}
            text={"Membership"}
            list1={"Home"}
            img={member1}
          />
        </div>
        {/* recently payments */}
        <div className="membership-card mb-5">
          <div className="card-body">
            <h5 className="card-title fw-bold fs-4">Recently Payments</h5>
            <hr />

            <div className="row">
              {dataMiniCard &&
                dataMiniCard
                  .sort((a, b) => {
                    if (new Date(a.date) < new Date(b.date)) {
                      return 1;
                    }
                  })
                  .slice(0, 6)
                  .map((e) => {
                    return (
                      <>
                        <div className="col-md-6 col-xl-4">
                          <div className="row">
                            <div className="col-12">
                              <MiniCard
                                img={e.img}
                                name={e.receiver}
                                date={moment(e.date).format("MMM DD, YYYY")}
                                tag={<TagStatus status={e.status} />}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
            </div>
          </div>
        </div>

        {/* chart */}
        <div className="membership-card mt-5 mb-5 ">
          <div className="container">
            <div className="row">
              <div className="col-12 col-xl-9 text-center text-xl-start">
                <p className="fw-semibold fs-4">Calculation</p>
              </div>
              <div className="col-12 col-xl-3 text-center text-xl-center">
                <p className="fw-semibold fs-4">
                  <Datepicker
                    controls={["calendar"]}
                    select="range"
                    touchUi={true}
                    inputComponent="input"
                    inputProps={placeholderpicker}
                    value={pickedDate}
                    onChange={onChangePickedDate}
                    dateFormat="MMMM DD"
                  />
                </p>
              </div>
              <div className="col-12">
                <ReactApexChart
                  options={opt.options}
                  series={opt.series}
                  height={"200%"}
                  className="chart-sm"
                />
              </div>
            </div>
          </div>
        </div>
        {/* membership */}
        <div className="membership-card mt-5 mb-5">
          <div className="container">
            {/* header */}
            <div className="row">
              <div className="col-12 col-xl-6 text-center text-xl-start ">
                <p className="fw-semibold fs-4">Membership</p>
              </div>
              <div className="col-12 col-xl-6 d-flex justify-content-end">
                <InputSearch
                  type={"text"}
                  name={"searchmembership"}
                  id={"searchmembership"}
                  onChange={(e) => {
                    setInputSearch(e.target.value);
                  }}
                  value={inputSearch}
                  placeholder={"Search by Receiver"}
                />
              </div>
            </div>
            {/* table */}
            <div className="mt-2 table-responsive">
              <table className="table table-borderless">
                <thead>
                  <tr className="border-top border-bottom">
                    <th className="TableHead fw-normal fs-4">Receiver</th>
                    <th className="TableHead fw-normal fs-4">
                      Type
                      <button
                        className="special-button"
                        onClick={() => {
                          console.log("type sorted");
                        }}>
                        <i className="bi bi-arrow-down-up sort-button"></i>
                      </button>
                    </th>
                    <th className="TableHead fw-normal fs-4">
                      Status
                      <button
                        className="special-button"
                        onClick={() => {
                          console.log("status sorted");
                        }}>
                        <i className="bi bi-arrow-down-up sort-button"></i>
                      </button>
                    </th>
                    <th className="TableHead fw-normal fs-4">
                      Date
                      <button
                        className="special-button"
                        onClick={onSortingDate}>
                        <i className="bi bi-arrow-down-up sort-button"></i>
                      </button>
                    </th>
                    <th className="TableHead fw-normal fs-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter((filtered) => {
                      return inputSearch.toLowerCase() === ""
                        ? filtered
                        : filtered.receiver.toLowerCase().includes(inputSearch);
                    })
                    .map((e) => {
                      return (
                        <>
                          <tr key={e.id}>
                            <td>
                              <div className="row">
                                <div className="col-2 me-2">
                                  <img
                                    src={e.img}
                                    alt=""
                                    width={"50vw"}
                                    className="rounded-3"
                                  />
                                </div>
                                <div className="col-6 fw-semibold fs-5">
                                  {e.receiver}
                                </div>
                              </div>
                            </td>
                            <td>
                              <TagMonthYear duration={e.type} />
                            </td>
                            <td>
                              <TagStatus status={e.status} />
                            </td>
                            <td>{moment(e.date).format("MMM DD, YYYY")}</td>
                            <td>Rp {e.amount}</td>
                            <td style={{ width: "5vw" }}>
                              <ButtonComponent
                                type={"submit"}
                                className={"btn-detail fs-5"}
                                id={"detail"}
                                onClick={() => {
                                  navigate(`membership/${e.id}`);
                                }}
                                buttonName={"Details"}
                              />
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManageMembership;
