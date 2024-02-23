import {
  Alert,
  AlertIcon,
  FormControl,
  Input,
  Box,
  HStack,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import useEditCookie from "./useEditCookie";
import { Cookie } from "./Cookie";
import CheckMarkButton from "../components/CheckMarkButton";
import CancelButton from "../components/CancelButton";

interface Props {
  id: number;
  oldDescription?: string;
  cookie: Cookie;
  onSubmit: () => void;
  onCancel: () => void;
}

const EditCookieDescriptionForm = ({
  id,
  oldDescription,
  cookie,
  onSubmit,
  onCancel
}: Props) => {
  const { editCookie, error, isLoading } = useEditCookie(id, onSubmit);

  const cookieDescription = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cookieDescriptionValue = cookieDescription.current?.value || "";

    const cookieData: Cookie = {
      ...cookie,
      description: cookieDescriptionValue,
    };

    editCookie(cookieData);
  };

  const description = oldDescription || "Add a cookie description";

  return (
    <>
      <Box width="100%">
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
                width="100%"
                variant='outline'
                borderColor='black'
                focusBorderColor="green"
                size='lg'
                ref={cookieDescription}
                backgroundColor="transparent"
                textAlign='center'
                fontSize='xl'
                defaultValue={description} // Set the input value from formData
              />
              {isLoading ? "..." : <CheckMarkButton />}
              <CancelButton onClick={onCancel} />
            </HStack>
          </FormControl>
        </form>
      </Box>
    </>
  );
};

export default EditCookieDescriptionForm;
