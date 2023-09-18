import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const containerStyle: React.CSSProperties = {
    backgroundColor: "#f7afc8", // Replace 'blue' with the color you want
    minHeight: "100vh", // Ensures the background covers the entire viewport
  };
  return (
    <div style={containerStyle}>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
