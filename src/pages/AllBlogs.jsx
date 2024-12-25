import { useLoaderData } from "react-router";
import BlogCard from "./components/BlogCard";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { FaFilter, FaLayerGroup, FaSearch } from "react-icons/fa";
import useAxios from "../utils/useAxios";

const AllBlogs = () => {
  const [blogData, setBlogData] = useState(useLoaderData().data);

  const axiosHook = useAxios();

  const handleFilter = (e) => {
    e.preventDefault();
    const searchVal = e.target.search.value;
    const categoryVal = e.target.category.value;
    console.log(searchVal, categoryVal);
    axiosHook
      .get(`/filterblogs?search=${searchVal}&category=${categoryVal}`)
      .then((res) => setBlogData(res.data));
  };
  console.log(blogData);
  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="my-12">
        <div>
          <h1 className="font-extrabold text-5xl text-accent text-center">
            Check out our damn fine blogs
          </h1>
        </div>
        <div>
          <form
            onSubmit={handleFilter}
            className="flex flex-col md:flex-row md:justify-end gap-6 items-center md:items-end my-6 w-11/12 mx-auto"
          >
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                name="search"
              />
              <FaSearch />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text flex items-center gap-1">
                  <FaLayerGroup /> Filter by category
                </span>
              </div>
              <select className="select select-bordered" name="category">
                <option value="All" selected>
                  All
                </option>
                <option value="Scienc">Science</option>
                <option value="Tech">Tech</option>
                <option value="Nature">Nature</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </label>
            <button className="btn btn-neutral" type="submit">
              <FaFilter /> Filter
            </button>
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-12 lg:mx-20 gap-6">
          {blogData.map((blog) => (
            <BlogCard key={blog._id} blogdata={blog} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AllBlogs;
