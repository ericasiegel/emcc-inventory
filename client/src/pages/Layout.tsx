import { Box } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const containerStyle: React.CSSProperties = {
    backgroundColor: "#f8a5c2", // Replace 'blue' with the color you want
    minHeight: "100vh", // Ensures the background covers the entire viewport
  };
  return (
    <div style={containerStyle}>
      <NavBar />
      <Box padding={5}>
        <Outlet />
      </Box>
    </div>
  );
};

export default Layout;
