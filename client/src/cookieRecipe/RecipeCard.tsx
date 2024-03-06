import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { Ingredients, Instructions } from "./Recipe";
import useGetData from "../hooks/useGetData";
import { INGREDIENTS_ENDOINT, INSTRUCTIONS_ENDOINT } from "../constants";
import IngredientsSection from "./IngredientsSection";
import InstructionsSection from "./InstructionsSection";

interface Props {
  id: number;
  name: string;
  notes: string | null;
}

const RecipeCard = ({ id, name, notes }: Props) => {
  const ingredientsResults = useGetData<Ingredients>({
    endpoint: INGREDIENTS_ENDOINT,
    id,
  });
  const ingredients =
    ingredientsResults?.data?.pages.flatMap((page) => page.results) || [];

  const instructionsResults = useGetData<Instructions>({
    endpoint: INSTRUCTIONS_ENDOINT,
    id,
  });
  const instructions =
    instructionsResults?.data?.pages.flatMap((page) => page.results) || [];

  return (
    <Card>
      <CardHeader>
        <Heading size="lg">{name} Cookie Recipe</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <IngredientsSection ingredients={ingredients} cookieId={id} />
          
          <InstructionsSection instructions={instructions} cookieId={id} />
          <Box>
            <Heading size="sm" textTransform="uppercase">
              Notes
            </Heading>
            <Text pt="2" fontSize="sm">
              {notes}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
