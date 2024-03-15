import { Box, Center, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import AddButton from "../components/AddButton";
import EditCookieDescriptionForm from "./EditCookieDescriptionForm";
import { Cookie } from "./Cookie";
import EditButton from "../components/EditButton";

interface Props {
  cookie: Cookie;
}

const CookieDescription = ({ cookie }: Props) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      {openForm ? (
        <EditCookieDescriptionForm
          id={cookie.id}
          oldDescription={cookie?.description}
          cookie={cookie}
          closeForm={() => setOpenForm(false)}
        />
      ) : (
        <Text fontSize="xl" as="cite">
          {cookie?.description ? (
            <HStack
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Box flex="1">
                <Center>{cookie?.description}</Center>
              </Box>
              <EditButton onClick={() => setOpenForm(true)} />
            </HStack>
          ) : (
            <>
              <Center>
                Add a cookie description{" "}
                <AddButton onClick={() => setOpenForm(true)} />
              </Center>
            </>
          )}
        </Text>
      )}
    </>
  );
};

export default CookieDescription;
