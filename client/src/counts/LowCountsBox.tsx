import { Heading, List, Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  subTitle?: string | null;
  children: ReactNode;
}

const LowCountsBox = ({ subTitle, children }: Props) => {
  return (
      <Box color="black" padding={1}>
        {subTitle && (
          <Heading fontSize="lg" as="b">
            {subTitle}
          </Heading>
        )}
        <List>{children}</List>
      </Box>
  );
};

export default LowCountsBox;
