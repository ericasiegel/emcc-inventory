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
import useAddCookie from "./useAddCookie";


const defaultCookieValue = {
  "id": 0,
  "name": "",
  "slug": "",
  "image": null,
  "description": "",
  "notes": null,
  "is_active": false,
  "ingredients": [],
  "instructions": [],
  "counts": {
      "doughs": 0,
      "baked_cookies": {
          "mega": 0,
          "mini": 0
      },
      "total_in_store": {
          "mega": 0,
          "mini": 0
      }
  },
  "delete_image": false
}

const AddCookieForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const resetForm = () => {
    setName("");
    setDescription('');
  };

  const { addCookie, error, isLoading } = useAddCookie(resetForm);

  const cookieName = useRef<HTMLInputElement>(null);
  const cookieDescription = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameValue = cookieName.current?.value || "";
    const cookieDescriptionValue = cookieDescription.current?.value || "";

    const cookieData = {
      ...defaultCookieValue,
      name: nameValue,
      description: cookieDescriptionValue,
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
              marginBottom={3}
            />
            <Input
              ref={cookieDescription}
              backgroundColor="white"
              placeholder="Cookie Description..."
              value={description} // Set the input value from formData
              onChange={(e) => setDescription(e.target.value)} // Update formData on input change
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
