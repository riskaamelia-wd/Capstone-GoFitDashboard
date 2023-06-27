import React, { useEffect, useState } from "react";
// import "./ManagesArticles.css";
import "./ManagesArticlesv2.css";
import Cover from "../../elements/Card/Cover";
import imgCover from "../../assets/icons/Appreciation 1.svg";
import CardArticles from "../../elements/Card/CardArticles";
import Circlebutton from "../../elements/Buttons/Circlebutton";
import addicon1 from "../../assets/icons/add.svg";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../api/useFetch";
import { articleApi } from "../../api/Api";
import axios from "axios";
import Loading from "../../components/Loading";
import Article from "../../components/Form/Article";
import { storage } from "../../Config/FirebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Pagination } from "react-bootstrap";

const ManagesArticles = () => {
  // const [popUpArticleAdd, setpopUpArticleAdd] = useState(false);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const state = useParams;
  const [uploadingImg, setUploadingImg] = useState(0);
  const [article, setArticle] = useState({
    title: "",
    introduction: "",
    imgFile: null,
    time: "",
  });
  let countText = article.introduction.length;
  const { response, isLoading, fetchData } = useFetch({
    api: articleApi,
    method: "get",
    url: "/article",
  });

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);

  const finder = data?.find((item) => item.id === id);
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
      imgFile: article.imgFile,
      title: article.title,
      introduction: article.introduction,
      time: currentTime,
    };
    if (window.confirm("Are you sure you want to submit?")) {
      if (finder) {
        await axios
          .put(
            `https://64866e02beba6297278ec839.mockapi.io/article/${id}`,
            body
          )
          .then(() => {
            alert("Data edited successfully");
            setArticle({
              imgFile: null,
              title: "",
              introduction: "",
              time: "",
            });
            handleClose();
            window.location.reload();
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await axios
          .post(`https://64866e02beba6297278ec839.mockapi.io/article`, body)
          .then(() => {
            alert("Data added succesfully");
            window.location.reload();
            handleClose();
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  // DELETE
  const HandleDelete = async (id) => {
    await axios
      .delete(`https://64866e02beba6297278ec839.mockapi.io/article/${id}`)
      .then(() => {
        alert("Data Deleted Succesfully!");
        fetchData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Handleclose
  const handleClose = () => {
    setShow(false);
    setArticle({
      imgFile: null,
      title: "",
      introduction: "",
      time: "",
    });
    setId(null);
  };

  const handleAddPopUP = () => {
    // setpopUpArticleAdd(!popUpArticleAdd);
    setShow(true);
    console.log("handle state");
  };



  // PAGINATION
  const [isSortArticle, setsortArticle] = useState({
    key: null,
    direction: "ascending",
  });
  const [iscurrentpageArticle, setcurrentpageArticle] = useState(1);
  const ArticleinPage = 4;

  const sortedArticle = [...data].sort((a, b) => {
    if (isSortArticle.key) {
      if (a[isSortArticle.key] < b[isSortArticle.key]) {
        return isSortArticle.direction === `ascending` ? -1 : 1;
      }
      if (a[isSortArticle.key] > b[isSortArticle.key]) {
        return isSortArticle.direction === `ascending` ? 1 : -1;
      }
    }
    return 0;
  });

  //reverse sorted id
  const reversedSortedArticle = [...sortedArticle].reverse();

  //calculate pagenation
  const indexOfLastItem = iscurrentpageArticle * ArticleinPage;
  const indexOfFirstItem = indexOfLastItem - ArticleinPage;
  const currentdata = reversedSortedArticle.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const showingFrom = indexOfFirstItem + 1;
  const showingTo = Math.min(indexOfLastItem, reversedSortedArticle.length);

    // Change page
    const handlePageChange = (pageNumber) => {
      setcurrentpageArticle(pageNumber);
    };
  
    const handlePrevPage = () => {
      if (iscurrentpageArticle > 1) {
        setcurrentpageArticle(iscurrentpageArticle - 1);
      }
    };
  
    const handleNextPage = () => {
      if (
        iscurrentpageArticle <
        Math.ceil(reversedSortedArticle.length / ArticleinPage)
      ) {
        setcurrentpageArticle(iscurrentpageArticle + 1);
      }
    };
  
    // Generate page numbers
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(reversedSortedArticle.length / ArticleinPage);
      i++
    ) {
      pageNumbers.push(i);
    }




  const generalView = () => {
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="row mt-0 p-0 m-0 mb-5">
            {currentdata.length > 0 ? (
              currentdata.map((item, id) => {
                return (
                  <div
                    key={id}
                    className="col-xl-6 col-lg-7 col-md-9 col-12 mb-4"
                  >
                    <CardArticles
                      // navigate={() =>
                      //   navigate(`/articles/Detail/${item.id}`, {
                      //     state: {
                      //       articledetail: data.title,
                      //     },
                      //   })
                      // }
                      img={item.imgFile}
                      title={item.title}
                      date={item.time}
                      onDelete={() => HandleDelete(item.id)}
                      onEdit={() => {
                        setShow(true);
                        setId(item.id);
                        setArticle({
                          title: item.title,
                          introduction: item.introduction,
                          imgFile: item.imgFile,
                          time: item.time,
                        });
                      }}
                    />
                  </div>
                );
              })
            ) : (
              <p className="text-center mt-5">No Data Article</p>
            )}
          </div>
        )}

        <Article
          show={show}
          handleClose={handleClose}
          countText={countText}
          title={(e) => {
            setArticle((filledState) => ({
              ...filledState,
              title: e.target.value,
            }));
          }}
          introduction={(e) => {
            setArticle((filledState) => ({
              ...filledState,
              introduction: e.target.value,
            }));
          }}
          imgFileChange={(e) => {
            let image = e.target.files[0];
            if (image && image.type.match("image.*")) {
              const storageRef = ref(storage, `/files/articles/${image.name}`);
              const uploadImg = uploadBytesResumable(storageRef, image);
              uploadImg.on(
                "state_changed",
                (snapshot) => {
                  const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  setUploadingImg(percent);
                },
                (err) => {
                  console.log(err.message);
                },
                () => {
                  getDownloadURL(uploadImg.snapshot.ref)
                    .then((url) => {
                      setArticle({ ...article, imgFile: url });
                      setUploadingImg(0);
                    })
                    .catch((err) => {
                      console.log(err.message);
                    });
                }
              );
            } else {
              alert("please select an image file (jpg, png, gif) !");
              e.target.value = null;
              image = e.target.value;
            }
          }}
          titleValue={article.title}
          imgFileValue={article?.imgFile}
          introductionValue={article.introduction}
          uploadingImg={uploadingImg}
          onSubmitHandle={onSubmitHandle}
        />
      </>
    );
  };

  return (
    <>
      <div className="container manage-articles">
        <Cover text={"Articles"} list1={"Home"} img={imgCover} />
        <div className="newsletter-articles-top">
          <div className="title mb-0 newsletter-articles-top-title">
            <h1>Articles & News</h1>
          </div>
          <div className="newsletter-articles-top-addbtn">
            {/* <NavLink to={"/managesfeedback"}> */}
            <Circlebutton
              type={"button"}
              className={"btn-circle-article-add"}
              id={"btn-circle-article-add"}
              imgUrl={addicon1}
              imgClassName={"btn-circle-icon-add"}
              onClick={handleAddPopUP}
            />
            {/* </NavLink> */}
          </div>
        </div>
        <div className={"newsletter-articles-body"}>
          {isLoading ? <Loading /> : generalView()}


          {/* <div className="newsletter-articles-body-card row">
            <div className="col-4">
              <CardArticles
                img={cardgirl1}
                date={"march 22, 2023"}
                title={"The 3 best exercises to doin your park"}
              />
            </div>
            <div className="col-4">
              <CardArticles
                img={cardboy1}
                date={"march 22, 2023"}
                title={"How to Choose The Right Equipment For You"}
              />
            </div>
          </div> */}
        </div>


        
    <div className="Pagination-article">
          
          {data.length > 0 && (
                  <div>
                    <Pagination className="d-flex justify-content-between">
                      <p>
                        showing {showingFrom} to {showingTo} of{" "}
                        {sortedArticle.length} entries
                      </p>
                      <div className="d-flex flex-row">
                        <Pagination.Prev
                          onClick={handlePrevPage}
                          disabled={iscurrentpageArticle === 1}
                          className="me-2 rounded-3"
                        >
                          Previous
                        </Pagination.Prev>
      
                        {pageNumbers.map((number) => (
                          <Pagination.Item
                            key={number}
                            active={number === currentdata}
                            onClick={() => handlePageChange(number)}
                          >
                            {number}
                          </Pagination.Item>
                        ))}
      
                        <Pagination.Next
                          onClick={handleNextPage}
                          disabled={
                            iscurrentpageArticle ===
                            Math.ceil(sortedArticle.length / ArticleinPage)
                          }
                          className="ms-2"
                        >
                          Next
                        </Pagination.Next>
                      </div>
                    </Pagination>
                  </div>
                )}
          </div>

      </div>
    </>
  );
};

export default ManagesArticles;
