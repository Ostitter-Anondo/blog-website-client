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
    </>
  );

  const authtBtns = (
    <>
      <ul className="menu menu-horizontal p-1 items-center border border-base-100 rounded-xl">
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
      <div className="menu menu-horizontal items-center gap-3 border border-base-100 rounded-full">
        <Link className="btn btn-circle size-12 p-1" to="/dashboard">
          <img
            src={userData?.photo}
            className="object-fill aspect-square rounded-full"
            alt="usrIMG"
          />
        </Link>
        <p>{userData?.name}</p>
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
      <div className="navbar bg-base-300 backdrop-blur">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <BsFillMenuButtonWideFill />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">{userData ? userBtns : authtBtns}</div>
      </div>
    </>
  );
};

export default Navbar;
