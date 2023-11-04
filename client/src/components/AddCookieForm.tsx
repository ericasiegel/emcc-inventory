import React, { useRef, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Checkbox,
  FormControl,
  // FormLabel,
  Input,
} from "@chakra-ui/react";
import { AddUpdateCookie } from "../entities/Cookie";
import useAddCookie from "../hooks/useAddCookie";

const AddCookieForm = () => {

  const [activeCookie, setActiveCookie] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const resetForm = () => {
    setName("");
    setActiveCookie(true);
  };

  const { addCookie, error, isLoading } = useAddCookie(resetForm)


  const cookieName = useRef<HTMLInputElement>(null);
  const isActive = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Extract the checked state of the Checkbox and convert it to a boolean
    const isActiveValue = isActive.current?.checked || false;

    // Ensure that cookieName.current?.value is not undefined
    const nameValue = cookieName.current?.value || "";

    const cookieData: AddUpdateCookie = {
      name: nameValue,
      is_active: isActiveValue,
    };

    addCookie(cookieData);
    // resetForm();
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
            <Checkbox
              paddingTop={3}
              ref={isActive}
              defaultChecked
              checked={activeCookie} // Set the checked state from formData
              onChange={(e) => {
                setActiveCookie(e.target.checked); // Update the separate state for the checkbox
              }}
            >
              Active Cookie?
            </Checkbox>
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
