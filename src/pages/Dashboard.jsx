import { NavLink, Outlet } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Dashboard = () => {
  const links = (
    <>
      <li>
        <NavLink to="/dashboard" end>Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/myblogs">My Blogs</NavLink>
      </li>
    </>
  );
  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="w-11/12 mx-auto grid md:grid-cols-4 auto-rows-min place-items-center md:place-items-start gap-3">
        <ul
          tabIndex={0}
          className="menu menu-sm menu-horizontal md:menu-vertical md:w-full bg-base-100/30 backdrop-blur-lg border border-base-300 rounded-box z-[1] mt-3 w-fit h-fit p-2 shadow"
        >
          {links}
        </ul>
        <div className="border border-base-300 my-3 md:col-span-3 rounded-lg min-h-96 w-full p-6 overflow-scroll">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
