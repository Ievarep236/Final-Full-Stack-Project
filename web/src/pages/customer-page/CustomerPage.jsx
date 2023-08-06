import { Button } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerPage = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const checkToken = () => {
    if (!token) {
      console.log("hello");
      navigate("/");
    }
  };

  useEffect(() => {
    checkToken();
  });

  return (
    <div>
      <h1>Customer Page</h1>
      <Button variant="contained">Add customer</Button>
    </div>
  );
};

export default CustomerPage;
