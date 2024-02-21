import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
} from "@chakra-ui/react";
import useAddCookieIngredient from "./useAddCookieIngredient";
import useIngredientItem from "./useIngredientItem";
import { useRef } from "react";

const defaultIngredientValue = {
  id: 0,
  cookie: "",
  cookie_id: 0,
  ingredient: "",
  ingredient_id: 0,
  quantity: 0,
  unit: "",
};

interface Props {
  cookieId: number;
  onClose: () => void;
}

const AddCookieIngredientForm = ({ cookieId, onClose }: Props) => {
  // get list of ingredients,
  const { data: getIngredientItems } = useIngredientItem();
  const ingredientItems = getIngredientItems?.pages.flatMap(
    (page) => page.results
  );


  const { addCookieIngredient, error, isLoading } =
    useAddCookieIngredient(onClose);

  const ingredientId = useRef<HTMLSelectElement>(null);
  const ingredientQuantity = useRef<HTMLInputElement>(null);
  const ingredientUnit = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ingredientIdValue = ingredientId.current?.value;
    const ingredientQuantityValue =
      ingredientQuantity.current?.querySelector("input")?.valueAsNumber;
    const ingredientUnitValue = ingredientUnit.current?.value;

    const cookieIngredientData = {
      ...defaultIngredientValue,
      cookie_id: cookieId,
      ingredient_id: parseInt(ingredientIdValue!),
      quantity: ingredientQuantityValue!,
      unit: ingredientUnitValue!,
    };

    addCookieIngredient(cookieIngredientData);
  };

  return (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <Box>
            <Select
              placeholder="Select Ingredient"
              ref={ingredientId}
              paddingBottom={2}
            >
              {ingredientItems?.map((ingredientItem) => (
                <option key={ingredientItem.id} value={ingredientItem.id}>
                  {ingredientItem.name}
                </option>
              ))}
            </Select>
            <HStack>
              <Text>Quantity:</Text>
              <NumberInput
                width="100%"
                ref={ingredientQuantity}
                defaultValue="1"
              >
                <NumberInputField type="number" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
            <Input
              ref={ingredientUnit}
              backgroundColor="white"
              placeholder="Unit Type"
            />
          </Box>
          <Center>
            <Button
              disabled={isLoading}
              type="submit"
              colorScheme="blue"
              marginTop={3}
            >
              {isLoading ? "Adding Ingredient..." : "Add Ingredient"}
            </Button>
          </Center>
        </FormControl>
      </form>
    </>
  );
};

export default AddCookieIngredientForm;
