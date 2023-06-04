import React from "react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Common/Navbar/Footer";
import Navbar from "../components/Common/Navbar/Navbar";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <>
        <Outlet></Outlet>
        <Footer></Footer>
      </>
    </div>
  );
};

export default Main;
