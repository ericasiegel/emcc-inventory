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
  useDisclosure,
} from "@chakra-ui/react";
import DeleteButton from "../components/DeleteButton";
import { Ingredients, Instructions } from "./Recipe";
import useGetData from "../hooks/useGetData";
import { INGREDIENTS_ENDOINT, INSTRUCTIONS_ENDOINT } from "../constants";
import FormModal from "../components/FormModal";
import AddCookieIngredientForm from "./AddCookieIngredientForm";
import EditCookieIngredientForm from "./EditCookieIngredientForm";

interface Props {
  id: number;
  name: string;
  notes: string | null;
}

const RecipeCard = ({ id, name, notes }: Props) => {
  const {
    isOpen: addIsOpen,
    onOpen: addOnOpen,
    onClose: addOnClose,
  } = useDisclosure();
  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onClose: editOnClose,
  } = useDisclosure();

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
              <FormModal
                header="Add Ingredient"
                isAddForm={true}
                onClose={addOnClose}
                isOpen={addIsOpen}
                onOpen={addOnOpen}
              >
                <AddCookieIngredientForm cookieId={id} onClose={addOnClose} />
              </FormModal>
            </HStack>
            <UnorderedList>
              {ingredients.map((ingredient) => (
                <ListItem key={ingredient.id}>
                  <HStack justifyContent="space-between" width="100%">
                    <Text>
                      {ingredient.ingredient} - {ingredient.quantity}{" "}
                      {ingredient.unit}
                    </Text>
                    <Box>
                      <FormModal
                        header={`Edit ${ingredient.ingredient}`}
                        isAddForm={false}
                        onClose={editOnClose}
                        isOpen={editIsOpen}
                        onOpen={editOnOpen}
                      >
                        <EditCookieIngredientForm
                          id={ingredient.id}
                          oldQuantity={ingredient.quantity}
                          oldUnit={ingredient.unit}
                          ingredient={ingredient}
                          onClose={editOnClose}
                        />
                      </FormModal>
                      <DeleteButton
                        id={ingredient.id}
                        endpoint={INGREDIENTS_ENDOINT}
                      />
                    </Box>
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
