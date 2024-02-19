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
import { useReducer, useRef } from "react";
import { AddUpdateCookieIngredients } from "./Recipe";
import addUpdateFormReducer, { StartingState } from "../reducers/addUpdateFormReducer";

interface Props {
  cookieId: number;
}

const AddCookieIngredientForm = ({ cookieId }: Props) => {
  // get list of ingredients,
  const { data: getIngredientItems } = useIngredientItem();
  const ingredientItems = getIngredientItems?.pages.flatMap(
    (page) => page.results
  );


  const initialState: StartingState = {
    cookieValue: 1,
    selectedStoredUsage: "",
    storedUsageValue: 0,
    storedQuantity: 0,
  };
  const [state, dispatch] = useReducer(addUpdateFormReducer, initialState);
  const { cookieValue } = state;

  const setIngredientQuantityValue = (value: number) => {
    dispatch({ type: "set_cookie_value", payload: value });
  };

  // add form reset function
  const resetForm = () => {
    console.log("reset form");
    if (ingredientId.current) ingredientId.current.value = "";
    setIngredientQuantityValue(1)
    if (ingredientUnit.current) ingredientUnit.current.value = "";
  };

  const { addCookieIngredient, error, isLoading } =
    useAddCookieIngredient(resetForm);

  const ingredientId = useRef<HTMLSelectElement>(null);
  const ingredientQuantity = useRef<HTMLInputElement>(null);
  const ingredientUnit = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ingredientIdValue = ingredientId.current?.value;
    const ingredientQuantityValue =
      ingredientQuantity.current?.querySelector("input")?.valueAsNumber;
    const ingredientUnitValue = ingredientUnit.current?.value;

    const cookieIngredientData: AddUpdateCookieIngredients = {
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
              <NumberInput width="100%" 
              ref={ingredientQuantity}
              value={cookieValue}
               onChange={(value) => setIngredientQuantityValue(Number(value))}
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
