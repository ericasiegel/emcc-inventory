import {
  Alert,
  AlertIcon,
  Box,
  FormControl,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Ingredients } from "./Recipe";
import useEditCookieIngredients from "./useEditCookieIngredients";
import CancelButton from "../components/CancelButton";
import CheckMarkButton from "../components/CheckMarkButton";
import { Form } from "react-router-dom";

interface Props {
  ingredient: Ingredients;
  closeForm: () => void;
}

const EditCookieIngredientForm = ({ ingredient, closeForm }: Props) => {
  const { editCookieIngredient, error, isLoading } = useEditCookieIngredients(
    ingredient.id,
    closeForm
  );

  const ingredientQuantity = useRef<HTMLInputElement>(null);
  const ingredientUnit = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ingredientQuantityValue =
      ingredientQuantity.current?.querySelector("input")?.valueAsNumber;
    const ingredientUnitValue = ingredientUnit.current?.value;

    const cookieIngredientData: Ingredients = {
      ...ingredient,
      quantity: ingredientQuantityValue!,
      unit: ingredientUnitValue!,
    };

    editCookieIngredient(cookieIngredientData);
  };

  return (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <Box width="100%">
        <Form onSubmit={handleFormSubmit}>
          <FormControl>
            <HStack>
              <NumberInput
                ref={ingredientQuantity}
                defaultValue={ingredient.quantity}
              >
                <NumberInputField type="number" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Input
                ref={ingredientUnit}
                backgroundColor="white"
                defaultValue={ingredient.unit}
                placeholder="Unit Type"
              />
              <HStack>
                {isLoading ? "..." : <CheckMarkButton />}
                <CancelButton onClick={closeForm} />
              </HStack>
            </HStack>
          </FormControl>
        </Form>
      </Box>
    </>
  );
};

export default EditCookieIngredientForm;
