import { Link, useLoaderData, useNavigate } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Markdown from "react-markdown";
import { IoIosArrowBack } from "react-icons/io";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import useMainContext from "../utils/useMainContext";
import useAxios from "../utils/useAxios";
import { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const BlogArticle = () => {
  const { userData, toastSuc } = useMainContext();
  const [commentStuff, setCommentStuff] = useState(null);
  const article = useLoaderData().data;
  const axiosHook = useAxios();

  const getDateString = (timeData) => {
    const dateVal = new Date(timeData).toString();
    return dateVal;
  };

  useEffect(() => {
    axiosHook
      .get(`/comments/${article._id}`)
      .then((res) => setCommentStuff(res.data))
      .catch((err) => console.error(err));
  }, [article._id, axiosHook]);

  console.log(commentStuff);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const photo = userData.photo
      ? userData.photo
      : "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg";
    const comment = e.target.comment.value;
    const uid = userData.uid;
    const email = userData.email;
    const time = new Date().getTime();
    const articleId = article._id;
    const postData = {
      articleId,
      comment,
      uid,
      email,
      time,
      photo,
    };
    axiosHook
      .post("/addcomment", postData)
      .then((res) => {
        console.log(res);
        setCommentStuff(res.data.comments);
        console.log(commentStuff);
        toastSuc("comment added");
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (commentId) => {
    axiosHook
      .delete(`/deletecomment/${commentId}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          toastSuc(`comment was successfully deleted`);
        }
      })
      .then(() => {
        axiosHook
          .get(`/comments/${article._id}`)
          .then((res) => setCommentStuff(res.data))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="my-12">
        <Link to={-1} className="btn btn-circle self-start mx-6">
          <IoIosArrowBack />
        </Link>
        <div className="flex flex-col items-center gap-12 mx-auto w-11/12 md:w-9/12">
          <h1 className="text-center font-extrabold text-5xl">
            {article.title}
          </h1>
          <div className="size-fit hover:cursor-pointer">
            <PhotoProvider>
              <PhotoView src={article.cover}>
                <img src={article.cover} className="rounded" alt="articleImg" />
              </PhotoView>
            </PhotoProvider>
          </div>
          <p className="text-sm text-justify">{article.summary}</p>
          <hr className="border border-accent w-full" />
          <div className="flex justify-between w-full items-center">
            <div className="border rounded-full border-base-300 bg-base-200 px-6 py-4">
              <p className="font-light text-secondary/60">Author:</p>
              <p className="font-bold text-primary">{article.email}</p>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <span className="badge badge-lg badge-secondary badge-outline">
                {article.category}
              </span>
              {userData?.uid === article.uid ? (
                <button
                  onClick={() => {
                    navigate(`/editblog/${article._id}`);
                  }}
                  className="btn rounded-lg btn-accent btn-sm w-fit"
                >
                  <FaEdit />
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
          <Markdown className="flex flex-col text-justify gap-5">
            {article.blog}
          </Markdown>
        </div>
        <hr className="border border-primary w-11/12 mx-auto my-6" />
        {!userData || userData.uid === article.uid ? (
          <>
            <h1 className="font-bold text-3xl text-center text-primary">
              you can not comment here
            </h1>
          </>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-11/12 mx-auto flex items-end gap-3"
          >
            <textarea
              className="textarea textarea-secondary grow w-full"
              placeholder="Add a comment"
              name="comment"
            ></textarea>
            <button type="submit" className="btn btn-success btn-outline">
              Comment
            </button>
          </form>
        )}
        <div className="w-11/12 mx-auto flex flex-col gap-6 my-12">
          {!commentStuff ? (
            <>
              <h1 className="font-bold text-xl text-center text-primary">
                such empty, much not comments...
              </h1>
            </>
          ) : (
            <>
              {commentStuff.map((commentVals, index) => (
                <div
                  key={index}
                  className="card border border-base-300 bg-base-200 p-3 w-full gap-3"
                >
                  <div className="flex justify-between">
                    <div className="flex gap-3 items-center">
                      <img
                        src={commentVals.photo}
                        alt="usrImg"
                        className="size-9 rounded-full"
                      />
                      <div>
                        <h3 className="font-bold text-accent text-sm">
                          {commentVals.email}
                        </h3>
                        <p className="text-xs font-light text-base-content/60">
                          {getDateString(commentVals.time)}
                        </p>
                      </div>
                    </div>
                    {userData?.uid === commentVals.uid ? (
                      <>
                        <button
                          onClick={() => {
                            handleDelete(commentVals._id);
                          }}
                          className="btn btn-xs btn-error"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <p>{commentVals.comment}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogArticle;
