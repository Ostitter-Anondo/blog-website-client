import { useNavigate } from "react-router";
import useMainContext from "../utils/useMainContext";
import Navbar from "./components/Navbar";
import { MdOutlineTitle } from "react-icons/md";
import { FaRegFileImage } from "react-icons/fa";
import useAxios from "../utils/useAxios";

const AddBlog = () => {
  const { userData, toastSuc } = useMainContext();

  const navigate = useNavigate();

  const axiosHook = useAxios();

  const handleAddReview = (e) => {
    e.preventDefault();

    const newBlog = {
      cover: e.target.coverIMG.value,
      title: e.target.title.value,
      category: e.target.category.value,
      email: userData.email,
      uid: userData.uid,
      summary: e.target.summary.value,
      blog: e.target.blog.value,
    };
    
    axiosHook
      .post(`/newblog`, newBlog)
      .then((res) => {
        console.log(res.data);
        toastSuc(`blog submission successful`);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="my-12">
        <form
          className="w-11/12 grid grid-cols-2 mx-auto gap-6"
          onSubmit={handleAddReview}
        >
          <label className="w-full input input-bordered flex items-center gap-2 col-span-2">
            <MdOutlineTitle />
            <input
              type="text"
              className="grow"
              placeholder="Title"
              name="title"
              required
            />
          </label>
          <label className="w-full input input-bordered flex items-center gap-2 col-span-2 md:col-span-1">
            <FaRegFileImage />
            <input
              type="text"
              className="grow"
              placeholder="Cover Image (URL)"
              name="coverIMG"
              required
            />
          </label>
          <select className="select select-info w-full grow col-span-2 md:col-span-1" name="category">
            <option value="n/a" disabled selected>
              Genre
            </option>
            <option value="Science">Science</option>
            <option value="Tech">Tech</option>
            <option value="Nature">Nature</option>
            <option value="Entertainment">Entertainment</option>
          </select>

          <textarea
            className="textarea min-h-48 textarea-bordered h-24 col-span-2"
            placeholder="Summary"
            name="summary"
            required
          ></textarea>
          <label className="form-control col-span-2">
            <div className="label">
              <span className="label-text-alt">Write in markdown</span>
              <span className="label-text-alt">
                <a
                  className="btn btn-link btn-xs p-0 min-h-0"
                  href="https://www.markdownguide.org/cheat-sheet/"
                  target="_blank"
                >
                  Markdown Cheat Sheet
                </a>
              </span>
            </div>
            <textarea
              className="textarea textarea-lg min-h-screen textarea-bordered h-24"
              placeholder="Blog Text"
              name="blog"
              required
            ></textarea>
          </label>
          <div></div>
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default AddBlog;
