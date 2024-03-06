import {
  Box,
  HStack,
  Heading,
  ListItem,
  UnorderedList,
  Text,
} from "@chakra-ui/react";
import { GoDash } from "react-icons/go";
import AddButton from "../components/AddButton";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import { INGREDIENTS_ENDOINT } from "../constants";
import AddCookieIngredientForm from "./AddCookieIngredientForm";
import EditCookieIngredientForm from "./EditCookieIngredientForm";
import { useState } from "react";
import { Ingredients } from "./Recipe";

interface Props {
  ingredients: Ingredients[];
  cookieId: number;
}

const IngredientsSection = ({ ingredients, cookieId }: Props) => {
  const [openForm, setOpenForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedIngredeint, setSelectedIngredient] = useState<number | null>(
    null
  );

  const openEditIngredientsForm = (ingredientId: number) => {
    setSelectedIngredient(ingredientId);
    setOpenEditForm(true);
  };

  return (
    <Box>
      <HStack>
        <Heading size="md" textTransform="uppercase">
          Ingredients
        </Heading>
        {openForm ? (
          <AddCookieIngredientForm
            cookieId={cookieId}
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
                      onClick={() => openEditIngredientsForm(ingredient.id)}
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
  );
};

export default IngredientsSection;
