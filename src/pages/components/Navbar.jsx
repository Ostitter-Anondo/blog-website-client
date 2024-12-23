import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { Link, NavLink } from "react-router";
import blog from "../../assets/blog.png";

const Navbar = () => {
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
            <img src={blog} className="size-8" alt="" /> <span className="hidden md:block">BlogWebsite</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">{authtBtns}</div>
      </div>
    </>
  );
};

export default Navbar;
