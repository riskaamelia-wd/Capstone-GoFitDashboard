/* eslint-disable react/prop-types */
import Cover from "../../elements/Card/Cover";
import member1 from "../../assets/icons/Members 1.svg";
import "./ManageMembership.css";
import TagStatus from "../../elements/Tag/TagStatus";
import InputSearch from "../../elements/InputSearch/InputSearch";
import { useEffect, useState } from "react";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
import TagMonthYear from "../../elements/Tag/TagMonthYear";
import ReactApexChart from "react-apexcharts";
import { Datepicker } from "@mobiscroll/react";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { adminApi, membershipApi } from "../../api/Api";
import useAxios from "../../customhooks/useAxios";
import useDebounce from "../../customhooks/useDebounce";
import { Puff } from "react-loader-spinner";
import ReactDatePicker from "react-datepicker";
import useAxiosFunction from "../../customhooks/useAxiosFunction";
import useCrudApi from "../../customhooks/useCrudApi";
const ManageMembership = () => {
  const [inputSearch, setInputSearch] = useState("");
  // const [data, setData] = useState([]);
  const [dataMembership, setDataMembership] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [debounce, setDebounce] = useDebounce("", 500);

  const { data, isLoading, error } = useCrudApi(
    membershipApi,
    `/membership?receiver=${inputSearch}`
  );
  //   const { response, loading, error } = useAxios({
  //     baseUrl:adminApi,
  //     method: 'GET',
  //     url: '/membership',
  //     headers: { // no need to stringify
  //       accept: '*/*'
  //     },
  //     // data: {  // no need to stringify
  //     //     userId: 1,
  //     //     id: 19392,
  //     //     title: 'title',
  //     //     body: 'Sample text',
  //     // },
  // });
  // const [response, error, loading, axiosFetch] = useAxiosFunction();
  // const getData = () => {
  //   axiosFetch({
  //     api: membershipApi,
  //     method: "get",
  //     url: "/membership",
  //   });
  // };

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

  const onSortingDate = () => {
    const sorted = data.sort((a, b) => {
      if (new Date(a.date) < new Date(b.date)) {
        return -1;
      } else if (new Date(a.date) > new Date(b.date)) {
        return 1;
      } else {
        return 0;
      }
    });
    setData(sorted);
    console.log(sorted.map((e) => moment(e.date).format("DD MMMM")));
  };

  // pakai use effect
  // useEffect()
  // useEffect(() => {
  //   getData();
  // }, []);
  useEffect(() => {
    if (data !== null) {
      const sorted = data.sort(
        (objA, objB) => Number(objB.date) - Number(objA.date)
      );
      // setDebounce(inputSearch);
      setDataMembership(data);
      setDataMiniCard(sorted);
    }

    if (startDate !== null && endDate !== null) {
      const FilteredPickedDate = data.filter(
        (data) =>
          moment(startDate).format("YYYY-M-DD") <=
            moment(data.date).format("YYYY-M-DD") &&
          moment(data.date).format("YYYY-M-DD") <=
            moment(endDate).format("YYYY-M-DD")
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
    }
    // if (inputSearch == "") {

    // } else {
    //   setData(response);
    //   setDebounce(inputSearch);
    // }
  }, [dataMembership, data, endDate, startDate, inputSearch, setDebounce]);

  // benerin pake timeout

  const recentlyView = () => {
    return (
      <>
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
      </>
    );
  };
  const chartView = () => {
    return (
      <>
        <div className="membership-card mt-5 mb-5 ">
          <div className="container">
            <div className="row">
              <div className="col-12 col-xl-9 text-center text-xl-start">
                <p className="fw-semibold fs-4">Calculation</p>
              </div>
              <div className="col-12 col-xl-3 text-center text-xl-center">
                <div className="fw-semibold fs-4 ">
                  <ReactDatePicker
                    className="w-75 "
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                      setDateRange(update);
                    }}
                    dateFormat="MMMM dd"
                    placeholderText="Select the date"
                  />
                </div>
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
      </>
    );
  };
  const membershipview = () => {
    return (
      <>
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
                    setInputSearch(e.target.value.trim());
                    // setDebounce(`?receiver=${e.target.value.trim()}`)
                    // setInputSearch(e.target.value.trim());
                  }}
                  value={inputSearch.replace("?receiver=", "")}
                  placeholder={"Search by Receiver"}
                />
                {/* {console.log(inputSearch)} */}
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
                    // .filter((filtered) => {
                    //   return inputSearch.toLowerCase() === ""
                    //     ? filtered
                    //     : filtered.receiver.toLowerCase().includes(inputSearch);
                    // })
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
                                  navigate(`/membership/${e.id}`);
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
      </>
    );
  };
  const generalView = () => {
    return (
      <>
        {recentlyView()}

        {/* chart */}
        {chartView()}
        {/* membership */}
        {membershipview()}
      </>
    );
  };
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

        {isLoading ? (
          // loading
          <>
            <div className="d-flex align-items-center justify-content-center">
              <Puff
                height="80"
                width="80"
                radius={1}
                color="#FFDB99"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          </>
        ) : (
          generalView()
        )}
      </div>
    </>
  );
};
export default ManageMembership;
