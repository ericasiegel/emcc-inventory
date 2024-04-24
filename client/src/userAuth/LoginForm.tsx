import {
  // Alert,
  // AlertIcon,
  Button,
  Center,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { useRef } from "react";
import APIClient from "../services/api-client";

const LoginForm = () => {
  const usernameData = useRef<HTMLInputElement>(null);
  const passwordData = useRef<HTMLInputElement>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = usernameData.current?.value || "";
    const password = passwordData.current?.value || "";

    console.log(username, password);
    

    try {
      // Call the API to authenticate the user
      const apiClient = new APIClient("");
      const token = await apiClient.fetchBearerToken(username, password);

      // Save token to local storage
      localStorage.setItem("accessToken", token);

      // Optionally, you can redirect the user to another page or perform other actions
    } catch (error) {
      // Handle authentication error
      console.error("Login failed:", error);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <>
      {/* {error && (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )} */}
      {/* <form> */}
      <form onSubmit={handleLogin}>
        <FormControl>
          <Input
            ref={usernameData}
            backgroundColor="white"
            placeholder="Username"
            size="lg"
            mb={2}
          />
          <Input
            ref={passwordData}
            backgroundColor="white"
            placeholder="Password"
            size="lg"
          />
          <Center>
            <Button colorScheme="purple" size="lg" my={3} type="submit">
              Login
            </Button>
          </Center>
        </FormControl>
      </form>
    </>
  );
};

export default LoginForm;
