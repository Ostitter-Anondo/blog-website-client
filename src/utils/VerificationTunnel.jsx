import PropTypes from "prop-types";
import LoadingPage from "./components/LoadingPage";
import useAxios from "./useAxios";
import useMainContext from "./useMainContext";
import { useEffect } from "react";

const VerificationTunnel = ({ children }) => {
  const { userData, loading } = useMainContext();
  const axiosHook = useAxios();

  useEffect(() => {
    axiosHook
      .get(`/jwtverify?uid=${userData.uid}`)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }, [axiosHook, userData.uid]);

  if (loading) {
    return <LoadingPage />;
  }

  return children;
};

VerificationTunnel.propTypes = {
  children: PropTypes.node,
};

export default VerificationTunnel;
