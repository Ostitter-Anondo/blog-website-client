import { useState } from "react";
import Context from "./Context";
import PropTypes from "prop-types";

const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightTheme, setLightTheme] = useState(true);

  const dataValues = {
    loading,
    setLoading,
    userData,
    setUserData,
    lightTheme,
    setLightTheme,
  };

  return <Context.Provider value={dataValues}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};

export default ContextProvider;
