import useMainContext from "../utils/useMainContext";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import NotFound from "./NotFound";
import { FaRegTrashCan } from "react-icons/fa6";

import "ka-table/style.css";
import useAxios from "../utils/useAxios";
import { Link } from "react-router";
import { CgDetailsMore } from "react-icons/cg";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const { wishlist, userData, setWishlist, toastSuc } = useMainContext();
  console.log(wishlist);
  const axiosHook = useAxios();
  const [wishlistStuff, setWishlistStuff] = useState(null)

  useEffect(() => {
    axiosHook.get(`/getwishlist?wishlist=${wishlist.wishlist}`).then(res=>setWishlistStuff(res.data))
  }, [axiosHook, wishlist.wishlist]);

  if (!wishlistStuff) {
    return <NotFound />;
  }

  const handleDelete = (blogId) => {
    const newData = {
      uid: userData.uid,
      wishlist: wishlist.wishlist.filter((item) => item != blogId),
    };
    axiosHook
      .put("/addtowishlist", newData)
      .then((res) => {
        console.log(res.data);
        if (res.data.result.acknowledged) {
          toastSuc(`blog removed from wishlist`);
        }
        setWishlist(res.data.newWishlist);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="min-h-screen">
        <div className="w-11/12 mx-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Article</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {wishlistStuff.map((article, index) => (
                <tr key={index} className="h-full">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={article.cover} alt="articleIMG" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{article.title}</div>
                        <div className="text-sm opacity-50">
                          {article.email}
                        </div>
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
                        to={`/blog/${article._id}`}
                        className="btn btn-accent btn-xs"
                      >
                        <CgDetailsMore />
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
            {/* foot */}
            <tfoot>
              <tr>
                <th>Article</th>
                <th>Category</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Wishlist;
