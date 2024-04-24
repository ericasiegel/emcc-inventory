import { Box, useDisclosure } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import MainModal from "../components/MainModal";
import LoginForm from "../userAuth/LoginForm";

const Layout = () => {
  const [ isLoggedIn, setIsLoggedIn] = useState(false);
  const { isOpen, onClose } = useDisclosure()

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) setIsLoggedIn(true);
  }, []);

  const containerStyle: React.CSSProperties = {
    backgroundColor: "#f8a5c2", // Replace 'blue' with the color you want
    minHeight: "100vh", // Ensures the background covers the entire viewport
  };
  return (
    <div style={containerStyle}>
      <NavBar />
      <Box padding={5}>
        { isLoggedIn ? (
          <Outlet />
        ) : (
          <MainModal header="Login to EMCC Inventory" isOpen={!isLoggedIn && !localStorage.getItem('accessToken')} onClose={onClose}>
            <LoginForm />
          </MainModal>
        )}
      </Box>
    </div>
  );
};

export default Layout;
