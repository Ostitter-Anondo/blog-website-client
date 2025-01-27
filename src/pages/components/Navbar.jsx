import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router";
import blog from "../../assets/blog.png";
import useMainContext from "../../utils/useMainContext";

const Navbar = () => {
  const { userData, signOutUser } = useMainContext();

  const navigate = useNavigate();

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {userData ? (
        <>
          <li>
            <NavLink to="/addblog">Add Blog</NavLink>
          </li>
          <li>
            <NavLink to="/wishlist">Wishlist</NavLink>
          </li>
        </>
      ) : (
        <></>
      )}
      <li>
        <NavLink to="/featured">Featured</NavLink>
      </li>
      <li>
        <NavLink to="/blogs">All Blogs</NavLink>
      </li>
    </>
  );

  const authtBtns = (
    <>
      <ul className="menu menu-horizontal p-1 items-center border border-base-300 rounded-xl">
        <li>
          <NavLink
            to="/login"
            className="border-r border-base-300 rounded-r-none rounded-l-lg"
          >
            Log in
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/signup"
            className="border-l border-base-300 rounded-r-lg rounded-l-none"
          >
            Sign up
          </NavLink>
        </li>
      </ul>
    </>
  );
  const userBtns = (
    <>
      <div className="menu menu-horizontal justify-center items-center gap-3 sm:border border-base-300 bg-base-200 rounded-full">
        <Link className="btn btn-circle size-12 p-1" to="/dashboard">
          <img
            src={
              userData?.photo
                ? userData.photo
                : "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
            }
            className="object-fill aspect-square rounded-full"
            alt="usrIMG"
          />
        </Link>
        <button
          onClick={() => {
            signOutUser();
            navigate("/");
          }}
          className="btn btn-outline btn-error rounded-full"
        >
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className="navbar bg-base-300/30 backdrop-blur">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <BsFillMenuButtonWideFill />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100/30 backdrop-blur-lg border border-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            <img src={blog} className="size-8" alt="" />{" "}
            <span className="hidden md:block">BlogWebsite</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 border border-base-300 rounded-lg">
            {links}
          </ul>
        </div>
        <div className="navbar-end">{userData ? userBtns : authtBtns}</div>
      </div>
    </>
  );
};

export default Navbar;
