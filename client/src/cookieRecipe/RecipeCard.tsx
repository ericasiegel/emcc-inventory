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
import useRecipes from "./useRecipes";

interface Props {
  cookie_id: number;
}

const RecipeCard = ({ cookie_id }: Props) => {
  const { data: recipeResults, isLoading, error } = useRecipes(cookie_id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) throw error;

  const recipeData = recipeResults?.results?.[0]
  console.log(recipeData);

  if (!recipeData) {
    return <div>No recipe found.</div>;
  }

  
  


  return (
    <Card>
      <CardHeader>
        <Heading size="md">Cookie Recipe</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="sm" textTransform="uppercase">
              Ingredients
            </Heading>
            <Text pt="2" fontSize="sm">
              Bullet Point Ingredient Here
            </Text>
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
