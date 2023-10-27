import React from "react";
import HeaderComponent from "../../components/Header/Header";
import Sidebarcomponent from "../../components/Sidebar/Sidebar";
import Footercomponent from "../../components/Footer/Footer";
import "./DefaultLayout.css";
const DefaultLayout = ({ children }) => {
  return (
    <div className="DefaultLayout">
      <HeaderComponent />
      <div className="wrapper-default">
        <Sidebarcomponent />
        {children}
      </div>
      <Footercomponent />
    </div>
  );
};

export default DefaultLayout;
