import { Alert, AlertIcon, FormControl, Input, Center, Button, Box } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import useEditCookie from './useEditCookie'
import { Cookie } from './Cookie';

interface Props {
    id: number;
    oldDescription?: string;
    cookie: Cookie
}

const EditCookieDescriptionForm = ({ id, oldDescription, cookie }: Props) => {
    const [newDescription, setNewDescription] = useState<string>('')

    const resetForm = () => {
        setNewDescription('');
    }

    const { editCookie, error, isLoading } = useEditCookie(id, resetForm);

    const cookieDescription = useRef<HTMLInputElement>(null);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const cookieDescriptionValue = cookieDescription.current?.value || '';

        const cookieData = {
          ...cookie,
            description: cookieDescriptionValue
        }

        editCookie(cookieData)
    }

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
              ref={cookieDescription}
              backgroundColor="white"
              placeholder={oldDescription}
              value={newDescription} // Set the input value from formData
              onChange={(e) => setNewDescription(e.target.value)} // Update formData on input change
              marginBottom={3}
            />
          </Box>
          <Center>
            <Button
              disabled={isLoading}
              type="submit"
              colorScheme="blue"
              marginTop={3}
            >
              {isLoading ? "Editing Description..." : "Edit Description"}
            </Button>
          </Center>
        </FormControl>
      </form>
    </>
  )
}

export default EditCookieDescriptionForm