import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckAuth } from "./authSlice";

async function CheckAuthAPI() {
  const url = "http://localhost:3000/auth/check";
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });


  
  if (!response.ok) {
    console.log("No Token");
    return null;
  }

  const data = await response.json();
  console.log("User data", data);
  return data;
}

function Security({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    console.log("====================================");
    console.log(users);
    console.log("====================================");
  }, [users]);

  useEffect(() => {
    const checkAuth = async () => {
      const userData = await CheckAuthAPI();

      if (!userData) {
        navigate("/login");
      } else {
        // Dispatch your CheckAuth action with the userData if needed
        dispatch(CheckAuth(userData));
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  return children;
}

export default Security;
