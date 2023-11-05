import React, { useRef, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { AddUpdateCookie } from "../entities/Cookie";
import useAddCookie from "../hooks/useAddCookie";

const AddCookieForm = () => {

  const [name, setName] = useState<string>("");
  const resetForm = () => {
    setName("");
  };

  const { addCookie, error, isLoading } = useAddCookie(resetForm)

  const cookieName = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameValue = cookieName.current?.value || "";

    const cookieData: AddUpdateCookie = {
      name: nameValue,
      is_active: true,
    };

    addCookie(cookieData);
  };


  return (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <Box>
            <Input
              ref={cookieName}
              backgroundColor="white"
              placeholder="Cookie Name..."
              value={name} // Set the input value from formData
              onChange={(e) => setName(e.target.value)} // Update formData on input change
            />
          </Box>
          <Center>
            <Button
              disabled={isLoading}
              type="submit"
              colorScheme="blue"
              marginTop={3}
            >
              {isLoading ? "Adding Cookie..." : "Add Cookie"}
            </Button>
          </Center>
        </FormControl>
      </form>
    </>
  );
};

export default AddCookieForm;
