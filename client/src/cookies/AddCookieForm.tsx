import React, { useRef } from "react";
import { Alert, AlertIcon, FormControl, HStack, Input } from "@chakra-ui/react";
import useAddCookie from "./useAddCookie";
import CheckMarkButton from "../components/CheckMarkButton";
import CancelButton from "../components/CancelButton";

const defaultCookieValue = {
  id: 0,
  name: "",
  slug: "",
  image: null,
  description: "",
  notes: null,
  is_active: false,
  ingredients: [],
  instructions: [],
  counts: {
    doughs: 0,
    baked_cookies: {
      mega: 0,
      mini: 0,
    },
    total_in_store: {
      mega: 0,
      mini: 0,
    },
  },
  delete_image: false,
};

interface Props {
  closeForm: () => void;
}

const AddCookieForm = ({ closeForm }: Props) => {
  const { addCookie, error, isLoading } = useAddCookie(closeForm);

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
          <HStack>
            <Input
              ref={cookieName}
              backgroundColor="white"
              placeholder="Cookie Name..."
              size="lg"
            />
            <Input
              ref={cookieDescription}
              backgroundColor="white"
              placeholder="Cookie Description..."
              size="lg"
            />
            {isLoading ? "..." : <CheckMarkButton />}
            <CancelButton onClick={closeForm} />
          </HStack>
        </FormControl>
      </form>
    </>
  );
};

export default AddCookieForm;
