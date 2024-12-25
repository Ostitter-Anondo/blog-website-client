import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";
import useMainContext from "../../utils/useMainContext";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import NotFoundAnim from "./NotFoundAnim.json";
import FoundAnim from "./FoundAnim.json";
import { FaEdit } from "react-icons/fa";

const MyBlogs = () => {
  const { userData } = useMainContext();
  const [myBlogs, setMyBlogs] = useState([]);
  const axiosHook = useAxios();

  useEffect(() => {
    axiosHook
      .get(`/myblogs/${userData.uid}`)
      .then((res) => setMyBlogs(res.data))
      .catch((err) => console.error(err));
  }, [axiosHook, userData.uid]);

  if (myBlogs.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center gap-12 mb-24">
          <div className="size-64">
            <Lottie animationData={NotFoundAnim} loop={true} />
          </div>
          <h1 className="font-extrabold text-xl lg:text-3xl text-accent">
            Opps... nothing to see here!
          </h1>
          <p className="font-semibold text-lg text-secondary">
            It seems you haven&apos;t posted anything yet... want to post a
            blog?
          </p>
          <Link to="/addblog" className="btn btn-wide btn-primary btn-lg">
            Post a blog...
          </Link>
        </div>
      </>
    );
  }

  const handleDelete = (blogId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosHook
          .delete(`/deleteblog/${blogId}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your blog has been deleted.",
                icon: "success",
              });
            }
          })
          .then(() => {
            axiosHook
              .get(`/myblogs/${userData.uid}`)
              .then((res) => setMyBlogs(res.data))
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
      }
    });
  };

  return (
    <>
      <div className="flex justify-center text-center">
        <h1 className="font-extrabold text-xl lg:text-3xl text-accent">
          All articles written by {userData.email}
        </h1>
      </div>
      <div className="size-64 mx-auto">
        <Lottie animationData={FoundAnim} loop={true} />
      </div>
      <div className="overflow-scroll">
        <table className="table">
          <thead>
            <tr>
              <th>Article</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {myBlogs.map((article, index) => (
              <tr key={index} className="h-full">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={article.cover} alt="articleIMG" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        <Link
                          to={`/blog/${article._id}`}
                          className="hover:underline"
                        >
                          {article.title}
                        </Link>
                      </div>
                      <div className="text-sm opacity-50">{article.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-sm badge-outline">
                    {article.category}
                  </span>
                </td>
                <th>
                  <div className="flex gap-6 justify-center">
                    <Link
                      to={`/editblog/${article._id}`}
                      className="btn btn-accent btn-xs"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => {
                        handleDelete(article._id);
                      }}
                      className="btn btn-error btn-xs"
                    >
                      <FaRegTrashCan />
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Article</th>
              <th>Category</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default MyBlogs;
