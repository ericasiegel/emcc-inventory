import { Alert, AlertIcon, FormControl, Input, Center, Button, Box } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import useEditCookieDescription from './useEditCookieDescription'
import { EditDescription } from './Cookie';

interface Props {
    id: number;
    oldDescription?: string;
}

const EditCookieDescriptionForm = ({ id, oldDescription }: Props) => {
    const [newDescription, setNewDescription] = useState<string>('')

    const resetForm = () => {
        setNewDescription('');
    }

    const { editCookieDescription, error, isLoading } = useEditCookieDescription(id, resetForm);

    const cookieDescription = useRef<HTMLInputElement>(null);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const cookieDescriptionValue = cookieDescription.current?.value || '';

        const cookieData: EditDescription = {
            description: cookieDescriptionValue
        }

        editCookieDescription(cookieData)
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