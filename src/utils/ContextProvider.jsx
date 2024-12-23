import { useState } from "react";
import Context from "./Context";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase/firebase.init";

const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightTheme, setLightTheme] = useState(true);

  const signupMailPass = (mail, pass) => {
    return createUserWithEmailAndPassword(auth, mail, pass);
  };

  const loginMailPass = (mail, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, mail, pass);
  };

  const googleProvider = new GoogleAuthProvider();
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    setLoading(true);
    setUserData(null);
    return signOut(auth);
  };

  const toastErr = (msg) =>
    toast.error(`${msg}`, {
      style: {
        padding: "16px",
        background: "#ff4d52",
        color: "#fff",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#ff4d52",
      },
    });

  const toastSuc = (msg) =>
    toast.success(`${msg}`, {
      style: {
        padding: "16px",
        background: "#4de62e",
        color: "#fff",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#4de62e",
      },
    });

  const dataValues = {
    loading,
    setLoading,
    userData,
    setUserData,
    lightTheme,
    setLightTheme,
    signupMailPass,
    loginMailPass,
    signInGoogle,
    signOutUser,
    toastErr,
    toastSuc,
  };

  return <Context.Provider value={dataValues}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};

export default ContextProvider;
