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
import { GoDash } from "react-icons/go";
import DeleteButton from "../components/DeleteButton";
import { Ingredients, Instructions } from "./Recipe";
import useGetData from "../hooks/useGetData";
import { INGREDIENTS_ENDOINT, INSTRUCTIONS_ENDOINT } from "../constants";
import AddCookieIngredientForm from "./AddCookieIngredientForm";
import EditCookieIngredientForm from "./EditCookieIngredientForm";
import { useState } from "react";
import AddButton from "../components/AddButton";
import EditButton from "../components/EditButton";

interface Props {
  id: number;
  name: string;
  notes: string | null;
}

const RecipeCard = ({ id, name, notes }: Props) => {
  const [openForm, setOpenForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedIngredeint, setSelectedIngredient] = useState<number | null>(
    null
  );

  const ingredientsResults = useGetData<Ingredients>({
    endpoint: INGREDIENTS_ENDOINT,
    id,
  });
  const ingredients =
    ingredientsResults?.data?.pages.flatMap((page) => page.results) || [];

  const InstructionsResults = useGetData<Instructions>({
    endpoint: INSTRUCTIONS_ENDOINT,
    id,
  });
  const Instructions =
    InstructionsResults?.data?.pages.flatMap((page) => page.results) || [];

  const openEditIngredientsForm = (ingredientId: number) => {
    setSelectedIngredient(ingredientId);
    setOpenEditForm(true);
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="lg">{name} Cookie Recipe</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <HStack>
              <Heading size="md" textTransform="uppercase">
                Ingredients
              </Heading>
              {openForm ? (
                <AddCookieIngredientForm
                  cookieId={id}
                  closeForm={() => setOpenForm(false)}
                />
              ) : (
                <AddButton onClick={() => setOpenForm(true)} />
              )}
            </HStack>
            <UnorderedList>
              {ingredients.map((ingredient) => (
                <ListItem key={ingredient.id}>
                  {openEditForm && selectedIngredeint === ingredient.id ? (
                    <>
                      <HStack justifyContent="space-between" width="100%">
                        <Text style={{ whiteSpace: "nowrap" }}>
                          {ingredient.ingredient}{" "}
                        </Text>
                        <GoDash />
                        <EditCookieIngredientForm
                          ingredient={ingredient}
                          closeForm={() => setOpenEditForm(false)}
                        />
                      </HStack>
                    </>
                  ) : (
                    <>
                      <HStack justifyContent="space-between" width="100%">
                        <Box>
                          <HStack>
                            <Text>{ingredient.ingredient} </Text>
                            <GoDash />
                            <Text>
                              {ingredient.quantity} {ingredient.unit}
                            </Text>
                          </HStack>
                        </Box>
                        <Box>
                          <EditButton
                            onClick={() =>
                              openEditIngredientsForm(ingredient.id)
                            }
                          />
                          <DeleteButton
                            id={ingredient.id}
                            endpoint={INGREDIENTS_ENDOINT}
                          />
                        </Box>
                      </HStack>
                    </>
                  )}
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
                  <HStack justifyContent="space-between" width="100%">
                    <Text>{instructon.instruction}</Text>
                    <DeleteButton
                      id={instructon.id}
                      endpoint={INSTRUCTIONS_ENDOINT}
                    />
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
