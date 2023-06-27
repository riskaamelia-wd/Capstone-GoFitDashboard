import Cover from "../../elements/Card/Cover";
import imgCover from "../../assets/icons/Appreciation 1.svg";
import { useEffect, useState } from "react";
import add from "../../assets/icons/add.svg";
import { useParams } from "react-router-dom";
import { articleApi } from "../../api/Api";
import useFetch from "../../api/useFetch";
import Loading from "../../components/Loading";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Config/FirebaseConfig";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
import axios from "axios";
import Article from "../../components/Form/Article";

const ArticlesDetail = () => {
  const param = useParams();

  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  // const [workout, setWorkout] = useState([])
  const [error, setError] = useState("");
  const [maxData, setMaxData] = useState(0);
  const [fill, setFill] = useState(true);
  const [uploadingImg, setUploadingImg] = useState("");

  const { response, isLoading, fetchData } = useFetch({
    api: articleApi,
    method: "get",
    url: `/article/${param.id}`,
  });

  const optionsTime = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const currentTime = new Date().toLocaleString("en-us", optionsTime);

  const [isArticleDetail, setArticleDetail] = useState({
    img: null,
    title: "",
    introduction: "",
    time: "",
  });

  console.log(param.id);

  const [isDivDisabled, setIsDivDisabled] = useState(false);

  const handleFill = () => {
    setFill((prevFill) => !prevFill);
  };

  const BtnFill = ({ className, onClick }) => {
    return <button onClick={onClick} className={className}></button>;
  };

  useEffect(() => {
    if (response !== null) {
      setData(response);
      setMaxData(response?.[0]?.category);
      if (data?.length >= maxData) {
        setIsDivDisabled(true);
        setError("Data has reached the limit!");
      } else {
        setError("");
        setIsDivDisabled(false);
      }
    }
  }, [response, isDivDisabled, data]);

  const handleClose = () => {
    setShow(false);
    setArticleDetail({
      img: null,
      title: "",
      introduction: "",
      time: "",
    });
    setId(null);
  };

  const finder = data.find((item) => item.id === id);
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    const optionsTime = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const currentTime = new Date().toLocaleString("en-us", optionsTime);
    const body = {
      img: isArticleDetail.imgFile,
      title: isArticleDetail.title,
      introduction: isArticleDetail.introduction,
      time: currentTime,
    };
    if (window.confirm("are you sure want to submit?")) {
      if (finder) {
        await axios
          .put(
            `https://64866e02beba6297278ec839.mockapi.io/article/${param.id}`,
            body
          )
          .then(() => {
            window.location.reload();
            alert("Data edited successfully");
            setArticleDetail({
              title: "",
              img: null,
              introduction: "",
              time: "",
            });
            handleClose();
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await axios
          .post(
            `https://64866e02beba6297278ec839.mockapi.io/article/${param.id}`,
            body
          )
          .then(() => {
            window.location.reload();
            alert("Data added successfully");
            setArticleDetail({
              img: null,
              title: "",
              introduction: "",
              time: "",
            });
            handleClose();
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  const generalView = () => {
    return (
      <>
        {data?.length > 0 ? (
          data?.map((data, id) => {
            return (
              <div key={id} className="container-fluid">
                <div className="container">
                  <div>
                    <BtnFill
                      className={fill ? "notFillBox" : "fillBox"}
                      onClick={handleFill}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <img src={data.img} alt="" />
                  </div>
                  <div>
                    <p>{data.date}</p>
                  </div>
                  <div>
                    <p>{data.title}</p>
                  </div>
                  <div>
                    <button>Save</button>
                  </div>
                </div>
                <div className="container">
                  <p>{data.introduction}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <p>No Data</p>
          </div>
        )}

        {/* <Article
        show={show}
        uploadingImg={uploadingImg}
        handleClose={handleClose}
        imgFileValue={isArticleDetail?.img}
        introductionValue={isArticleDetail?.introduction}
        introduction={(e) => {
          setArticleDetail((filledState) => ({
            ...filledState,
            introduction: e.target.value,
          }));
        }}
        title={(e) => {
          setArticleDetail((filledState) => ({
            ...filledState,
            title: e.target.value,
          }))
        }}
        titleValue={isArticleDetail?.title}
        imgFileChange={(e) => {
          let imgFile = e.target.files[0];
          if(imgFile && imgFile.type.match())
        }}
        >

        </Article> */}

      </>
    );
  };
  return (
    <>
      <div className="container-fluid">
        <Cover img={imgCover} text={"Article"} list1={"Home"} list2={"News"} />
        {isLoading ? <Loading /> : generalView()}
      </div>
    </>
  );
};

export default ArticlesDetail;
