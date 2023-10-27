import React from "react";
import "./Default.css";
import Headercomponet from "../../components/Header/Header";

const Default = ({ children }) => {
  return (
    <div>
      <Headercomponet />
      {children}
    </div>
  );
};

export default Default;
