import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
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
    onSuccess: (savedCookie, newCookie) => {
        console.log(savedCookie);
        queryClient.invalidateQueries({
            queryKey: ['cookies']
        })
        
    }
  });
  const cookieName = useRef<HTMLInputElement>(null);
  const isActive = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Extract the checked state of the Checkbox and convert it to a boolean
    const isActiveValue = isActive.current?.checked || false;

    // Ensure that cookieName.current?.value is not undefined
    const nameValue = cookieName.current?.value || ""; // Provide a default value if it's undefined

    const cookieData: AddCookie = {
      name: nameValue,
      is_active: isActiveValue,
    };

    // console.log(cookieData);
    // if (isActive.current && isActive.current.value)
      addCookie.mutate(cookieData);
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
          />
          <Checkbox ref={isActive} defaultChecked>
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
