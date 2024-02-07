import {
  Box,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
 ListItem,
  Stack,
  StackDivider,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import DeleteButton from "../components/DeleteButton";
import { Ingredients, Instructions } from "./Recipe";
import useGetData from "../hooks/useGetData";
import { INGREDIENTS_ENDOINT, INSTRUCTIONS_ENDOINT } from "../constants";

interface Props {
  id: number;
  name: string;
  notes: string;
}

const RecipeCard = ({
  id,
  name, 
  notes
}: Props) => {
  const ingredientsResults = useGetData<Ingredients>({ endpoint: INGREDIENTS_ENDOINT, id });
  const ingredients = ingredientsResults?.data?.pages.flatMap((page) => page.results) || [];

  const InstructionsResults = useGetData<Instructions>({ endpoint: INSTRUCTIONS_ENDOINT, id });
  const Instructions = InstructionsResults?.data?.pages.flatMap((page) => page.results) || [];
  

  return (
    <Card>
      <CardHeader>
        <Heading size="lg">{name} Cookie Recipe</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
          <Heading size="md" textTransform="uppercase">
        Ingredients
      </Heading>
      <UnorderedList>
        {ingredients.map((ingredient) => (
                <ListItem key={ingredient.id}>
                  <HStack justifyContent='space-between' width='100%'>
                    <Text>{ingredient.ingredient} - {ingredient.quantity} {ingredient.unit}</Text>
                    <DeleteButton id={ingredient.id} endpoint={INGREDIENTS_ENDOINT} />
                  </HStack>
                </ListItem>
              ))}
      </UnorderedList>
          </Box>
          <Box>
            <Heading size="md" textTransform="uppercase">
              Instructions
            </Heading>
            <UnorderedList>
        {Instructions.map((instructon) => (
                <ListItem key={instructon.id}>
                  <HStack justifyContent='space-between' width='100%'>
                    <Text>{instructon.instruction}</Text>
                    <DeleteButton id={instructon.id} endpoint={INSTRUCTIONS_ENDOINT} />
                  </HStack>
                </ListItem>
              ))}
      </UnorderedList>
          </Box>
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
