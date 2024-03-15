import { Heading, Box, Text, HStack } from "@chakra-ui/react";
import { useState } from "react";
import AddButton from "../components/AddButton";
import NoteForm from "./NoteForm";
import EditButton from "../components/EditButton";

interface Props {
  notes: string | null;
  cookieId: number;
}

const NotesSection = ({ notes, cookieId }: Props) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <Box>
      <HStack  paddingBottom={2}>
        <Heading size="sm" textTransform="uppercase">
          Notes
        </Heading>
        {!openForm &&
          (notes === null || notes === "" ? (
            <AddButton onClick={() => setOpenForm(true)} />
          ) : (
            <EditButton onClick={() => setOpenForm(true)} />
          ))}
      </HStack>
      {openForm ? (
        <NoteForm
          cookieId={cookieId}
          note={notes!}
          closeForm={() => setOpenForm(false)}
        />
      ) : (
        <Text>{notes}</Text>
      )}
    </Box>
  );
};

export default NotesSection;
