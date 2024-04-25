import { Box } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./LoginPage";

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setIsLoggedIn(true);
  }, []);

  const containerStyle: React.CSSProperties = {
    // backgroundColor: "#f8a5c2", 
    backgroundColor: "#ebb6c8", 
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
