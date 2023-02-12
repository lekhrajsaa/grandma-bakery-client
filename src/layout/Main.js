import React from "react";
import { Outlet } from "react-router-dom";
import HeadNav from "../components/HeadNav";

const Main = () => {
  return (
    <div>
      <HeadNav></HeadNav>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
