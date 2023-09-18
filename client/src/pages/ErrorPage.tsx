import { Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";

const ErrorPage = () => {
  const error = useRouteError();
  const containerStyle: React.CSSProperties = {
    backgroundColor: "#f7afc8", // Replace 'blue' with the color you want
    minHeight: "100vh", // Ensures the background covers the entire viewport
  };
  return (
    <div style={containerStyle}>
      <NavBar />
      <Heading>Oops</Heading>
      <Text>
        {isRouteErrorResponse(error)
          ? "This page does not exist"
          : "An unexpected error occured"}
      </Text>
    </div>
  );
};

export default ErrorPage;
