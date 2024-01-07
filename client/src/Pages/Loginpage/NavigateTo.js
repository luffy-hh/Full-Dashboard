import React from "react";
import { Navigate } from "react-router-dom";

function NavigateTo({ role }) {
  return (
    <>
      {role === "Admin" && <Navigate to="/admin/*" />}
      {role === "Master" && <Navigate to="/master" />}
      {role === "Agent" && <Navigate to="/agent" />}
    </>
  );
}

export default NavigateTo;
