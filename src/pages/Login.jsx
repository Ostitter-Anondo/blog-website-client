import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

const Login = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="my-12">
        <Outlet />
      </main>
    </>
  );
};

export default Login;
