
import { useRef } from 'react';
import { COOKIES_ENDPOINT } from '../constants';
import { EditNotes } from '../cookies/Cookie'
import useEditData from '../hooks/useEditData'
import { Alert, AlertIcon, Box, FormControl, HStack, Input } from '@chakra-ui/react';
import CancelButton from '../components/CancelButton';
import CheckMarkButton from '../components/CheckMarkButton';

interface Props {
  cookieId: number;
  note?: string;
  closeForm: () => void;
}

const NoteForm = ({ cookieId, note, closeForm }: Props) => {
    const { editData, error, isLoading } = useEditData<EditNotes>({
      id: cookieId,
      endpoint: COOKIES_ENDPOINT,
      onSuccessCallback: closeForm
    })

    const noteInput = useRef<HTMLInputElement>(null);
    

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const noteValue = noteInput.current?.value;

      const noteData = {
        notes: noteValue!,
      }
      editData(noteData)
    }

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
                variant="outline"
                borderColor="black"
                focusBorderColor="green"
                size="md"
                ref={noteInput}
                backgroundColor="transparent"
                textAlign="left"
                fontSize="md"
                defaultValue={note ? note : ''}
                placeholder='Add a recipe note'
              />
              {isLoading ? "..." : <CheckMarkButton />}
              <CancelButton onClick={closeForm} />
            </HStack>
          </FormControl>
        </form>
      </Box>
    </>
  )
}

export default NoteForm