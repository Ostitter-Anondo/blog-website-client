import PropTypes from "prop-types";
import { BsBookmarkHeart, BsTextParagraph } from "react-icons/bs";
import { Link } from "react-router";

const BlogCard = ({ blogdata }) => {
  return (
    <div className="card border border-base-300 rounded-tr-none rounded-bl-none transition-all hover:shadow-xl hover:shadow-accent/10 hover:scale-105 grid lg:grid-rows-3">
      <figure className="h-48">
        <img src={blogdata.cover} alt="blogImg" className="" />
      </figure>
      <div className="card-body lg:row-span-2">
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
        <div className="card-actions justify-end">
          <button className="btn btn-outline btn-xs btn-info">
            <BsBookmarkHeart />
            Wishlist
          </button>
          <Link className="btn btn-outline btn-xs btn-warning">
            <BsTextParagraph />
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  blogdata: PropTypes.object,
};

export default BlogCard;
