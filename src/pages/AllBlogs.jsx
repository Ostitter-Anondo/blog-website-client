import { useLoaderData } from "react-router";
import BlogCard from "./components/BlogCard";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const AllBlogs = () => {
  const blogData = useLoaderData().data;
  console.log(blogData)
  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-12 lg:mx-20 gap-6">
        {blogData.map(blog => <BlogCard key={blog._id} blogdata={blog} />)}
      </main>
      <Footer />
    </>
  );
};

export default AllBlogs;
