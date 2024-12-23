import PropTypes from "prop-types";
import { useContext } from "react";
import Context from "./Context";
import Navbar from "../pages/components/Navbar";
import LoadingPage from "./components/LoadingPage";
import Signin from "../pages/Login/Signin";

const PrivateRoute = ({ children }) => {
  const { userData, loading, } = useContext(Context);
  if (loading) {
    return (
      <LoadingPage />
    );
  }

  if (userData) {
    return children;
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="flex my-24 items-center justify-center">
          <Signin/>
        </div>
      </main>
    </>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;