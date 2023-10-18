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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { AddUpdateCookie } from "../services/api-client";
import { Cookie } from "../entities/Cookie";

const AddCookieForm = () => {
  const apiClient = new APIClient("cookies/");
  const queryClient = useQueryClient();
  const addCookie = useMutation<Cookie, Error, AddUpdateCookie>({
    mutationFn: (cookie: AddUpdateCookie) =>
      apiClient.addCookie(cookie).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cookies"],
      });
      resetForm(); // Call the resetForm function to clear the form
    },
  });

  const [formData, setFormData] = useState<AddUpdateCookie>({
    name: "",
    is_active: true,
  });

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

    addCookie.mutate(cookieData);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      is_active: true,
    });
  };

  return (
    <>
      {addCookie.error && (
        <Alert status="error">
          <AlertIcon />
          {addCookie.error.message}
        </Alert>
      )}
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <Box>
            <Input
              ref={cookieName}
              backgroundColor="white"
              placeholder="Cookie Name..."
              value={formData.name} // Set the input value from formData
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              } // Update formData on input change
            />
            <Checkbox
              paddingTop={3}
              ref={isActive}
              defaultChecked
              checked={formData.is_active} // Set the checked state from formData
              onChange={(e) =>
                setFormData({ ...formData, is_active: e.target.checked })
              } // Update formData on checkbox change
            >
              Active Cookie?
            </Checkbox>
          </Box>
          <Center>
            <Button type="submit" colorScheme="blue" marginTop={3}>
              Add Cookie
            </Button>
          </Center>
        </FormControl>
      </form>
    </>
  );
};

export default AddCookieForm;
