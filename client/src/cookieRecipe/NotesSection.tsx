import { Heading, Box, Text, HStack } from "@chakra-ui/react";
import { useState } from "react";
import AddButton from "../components/AddButton";

interface Props {
  notes: string | null;
  cookieId: number;
}

const NotesSection = ({ notes, cookieId }: Props) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <Box>
      <HStack>
        <Heading size="sm" textTransform="uppercase">
          Notes
        </Heading>
        {/* {openForm ? (
            
        ) : (
            <AddButton onClick{() => setOpenForm(true)} />
        )} */}
      </HStack>
      <Text pt="2" fontSize="sm">
        {notes}
      </Text>
    </Box>
  );
};

export default NotesSection;
