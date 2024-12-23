import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import ContextProvider from "./utils/ContextProvider";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Signin from "./pages/Login/Signin";
import NotFound from "./pages/NotFound";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />}>
            <Route index element={<Signin />} />
          </Route>
          <Route path ="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </ContextProvider>
  </StrictMode>
);
