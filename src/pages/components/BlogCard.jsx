import PropTypes from "prop-types";
import { BsBookmarkHeart, BsTextParagraph } from "react-icons/bs";
import { Link, useNavigate } from "react-router";
import useMainContext from "../../utils/useMainContext";
import useAxios from "../../utils/useAxios";

const BlogCard = ({ blogdata }) => {
  const { userData, setUserData, wishlist, setWishlist, toastSuc, toastErr } =
    useMainContext();
  const navigate = useNavigate();
  const axiosHook = useAxios();
  const handleAddToWishlist = () => {
    if (!userData) {
      toastErr("you are not logged in, please login");
      navigate("/login");
      return;
    }
    if (!userData.wishlistId) {
      const newBlog = {
        uid: userData.uid,
        wishlist: [blogdata._id],
      };
      axiosHook
        .post("/newwishlist", newBlog)
        .then((res) => {
          if (res.data.wishlistData.acknowledged) {
            toastSuc(`file added to wishlist`);
          }
          setWishlist(res.data.wishlist);
          setUserData(res.data.user);
        })
        .catch((err) => console.error(err));
    } else {
      if (
        wishlist.wishlist.filter((item) => item === blogdata._id).length > 0
      ) {
        toastErr(`blog already in wishlist`);
      } else {
        const newBlog = {
          uid: userData.uid,
          wishlist: [...wishlist.wishlist, blogdata._id],
        };
        axiosHook
          .put("/addtowishlist", newBlog)
          .then((res) => {
            console.log(res.data);
            if (res.data.result.acknowledged) {
              toastSuc(`blog added to wishlist`);
            }
            setWishlist(res.data.newWishlist);
          })
          .catch((err) => console.error(err));
      }
    }
  };

  return (
    <div className="card border border-base-300 rounded-tr-none rounded-bl-none transition-all hover:shadow-xl hover:shadow-accent/10 hover:scale-105 grid lg:grid-rows-3">
      <figure className="h-48 w-full">
        <img
          src={blogdata.cover ? blogdata.cover : `https://placehold.co/600x400`}
          alt="blogImg"
          className="object-cover w-full"
        />
      </figure>
      <div className="card-body">
        <div className="">
          <h3 className="card-title inline-block">
            {blogdata.title}{" "}
            <span className="badge badge-secondary badge-xs">
              {blogdata.category}
            </span>
          </h3>
        </div>
        <div className="overflow-scroll">
          <p className="text-xs text-justify">{blogdata.summary}</p>
        </div>
      </div>
      <div className="card-body flex-row justify-end items-end">
        <button
          onClick={handleAddToWishlist}
          className="btn btn-outline btn-xs btn-info"
        >
          <BsBookmarkHeart />
          Wishlist
        </button>
        <Link
          to={`/blog/${blogdata._id}`}
          className="btn btn-outline btn-xs btn-warning"
        >
          <BsTextParagraph />
          Details
        </Link>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  blogdata: PropTypes.object,
};

export default BlogCard;
