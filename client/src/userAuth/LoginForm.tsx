import {
  Alert,
  AlertIcon,
  Button,
  Center,
  FormControl,
  Input,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import APIClient from "../services/api-client";

const LoginForm = () => {
  const [error, setError] = useState('');
  
  const usernameData = useRef<HTMLInputElement>(null);
  const passwordData = useRef<HTMLInputElement>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = usernameData.current?.value || "";
    const password = passwordData.current?.value || "";

    console.log(username, password);
    

    try {
      // Call the API to authenticate the user
      const apiClient = new APIClient(""); // Ensure endpoint is properly set if needed
      await apiClient.fetchBearerToken(username, password);

      // Reload the page to reflect the authenticated state
      window.location.reload();

    } catch (error) {
      // Handle authentication error
      console.error("Login failed: ", error);
      setError("Login failed. Please check your credentials.");
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
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
            <Button bg="#6F1E51" size="lg" my={3} type="submit" _hover={{ bg: "#B33771" }} >
              <Text color='white'>Login</Text>
            </Button>
          </Center>
        </FormControl>
      </form>
    </>
  );
};

export default LoginForm;
