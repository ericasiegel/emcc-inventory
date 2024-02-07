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
import useRecipes from "./useRecipes";
import DeleteButton from "../components/DeleteButton";

interface Props {
  notes: string;
  ingredients: Ingredients
}

const RecipeCard = ({ cookie_id }: Props) => {
  const { data: recipeResults, isLoading, error } = useRecipes(cookie_id);
  console.log(recipeResults);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) throw error;

  const recipeData = recipeResults?.results?.[0]

  if (!recipeData) {
    return <div>No recipe found.</div>;
  }

  
  


  return (
    <Card>
      <CardHeader>
        <Heading size="lg">{recipeData.cookie} Cookie Recipe</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="md" textTransform="uppercase">
              Ingredients
            </Heading>
            <UnorderedList>
              {recipeData.recipeingredient_set.map((ingredient) => (
                <ListItem key={ingredient.id}>
                  <HStack justifyContent='space-between' width='100%'>
                    <Text>{ingredient.ingredient_name} - {ingredient.quantity} {ingredient.unit}</Text>
                    <DeleteButton id={ingredient.id} endpoint={`recipes/${recipeData.id}/recipe-ingredients`} />
                  </HStack>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
          <Box>
            <Heading size="sm" textTransform="uppercase">
              Instructions
            </Heading>
            <Text pt="2" fontSize="sm">
              Bullet Point Instruction Here
            </Text>
          </Box>
          <Box>
            <Heading size="sm" textTransform="uppercase">
              Notes
            </Heading>
            <Text pt="2" fontSize="sm">
              Bullet Point Notes
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
