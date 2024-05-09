import { Box } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./LoginPage";

const useSessionTimeout = (timeoutPeriod = 3600000) => {  // 1 hour timeout
  useEffect(() => {
    let timeout = setTimeout(() => {
      localStorage.removeItem("accessToken");  // Clear the access token
      window.location.reload();  // Reload the page to redirect to login
    }, timeoutPeriod);

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        localStorage.removeItem("accessToken");
        window.location.reload();
      }, timeoutPeriod);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [timeoutPeriod]);
};

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useSessionTimeout(3600000); // set timeout as required

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setIsLoggedIn(true);
  }, []);

  const containerStyle: React.CSSProperties = {
    // backgroundColor: "#f8a5c2", 
    backgroundColor: "#edc8d5", 
    minHeight: "100vh", // Ensures the background covers the entire viewport
  };
  return (
    <div style={containerStyle}>
      {isLoggedIn ? (
        <>
          <NavBar />
          <Box padding={5}>
            <Outlet />
          </Box>
        </>
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default Layout;
