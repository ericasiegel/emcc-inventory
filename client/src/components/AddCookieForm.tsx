import React, { useRef, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface AddCookie {
  name: string;
  is_active: boolean;
}

const AddCookieForm = () => {
  const queryClient = useQueryClient();
  const addCookie = useMutation({
    mutationFn: (cookie: AddCookie) =>
      axios
        .post<AddCookie>("http://127.0.0.1:8000/bakery/cookies/", cookie)
        .then((res) => res.data),
    onSuccess: (savedCookie) => {
      console.log(savedCookie);
      queryClient.invalidateQueries({
        queryKey: ["cookies"],
      });
      resetForm(); // Call the resetForm function to clear the form
    },
  });

  const [formData, setFormData] = useState<AddCookie>({
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

    const cookieData: AddCookie = {
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
    <form onSubmit={handleFormSubmit}>
      <FormControl>
        <FormLabel fontSize="lg">Add Cookie</FormLabel>
        <HStack>
          <Input
            ref={cookieName}
            backgroundColor="white"
            placeholder="Cookie Name..."
            value={formData.name} // Set the input value from formData
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} // Update formData on input change
          />
          <Checkbox
            ref={isActive}
            defaultChecked
            checked={formData.is_active} // Set the checked state from formData
            onChange={(e) =>
              setFormData({ ...formData, is_active: e.target.checked })
            } // Update formData on checkbox change
          >
            Active Cookie?
          </Checkbox>
        </HStack>
        <Button type="submit" colorScheme="blue" marginTop={3}>
          Add Cookie
        </Button>
      </FormControl>
    </form>
  );
};

export default AddCookieForm;
