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
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Ingredients } from "./Recipe";
import useEditCookieIngredients from "./useEditCookieIngredients";

interface Props {
  id: number;
  oldQuantity: number;
  oldUnit: string;
  ingredient: Ingredients;
  onClose: () => void;
}

const EditCookieIngredientForm = ({
  id,
  oldQuantity,
  oldUnit,
  ingredient,
  onClose
}: Props) => {
  const [ingredientQuantityValue, setIngredientQuantityValue] =
    useState(oldQuantity);
  const [ingredientUnitValue, setIngredientUnitValue] = useState(oldUnit);

  // add form reset function
  const resetForm = () => {
    setIngredientQuantityValue(ingredientQuantityValue);
    setIngredientUnitValue(ingredientUnitValue);
  };

  const { editCookieIngredient, error, isLoading } = useEditCookieIngredients(
    id,
    onClose
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
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <Box>
            <HStack>
              <Text>Quantity:</Text>
              <NumberInput
                width="100%"
                ref={ingredientQuantity}
                defaultValue={ingredientQuantityValue}
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
              defaultValue={ingredientUnitValue}
              placeholder={ingredientUnitValue}
            />
          </Box>
          <Center>
            <Button
              disabled={isLoading}
              type="submit"
              colorScheme="blue"
              marginTop={3}
            >
              {isLoading ? "Editing Ingredient..." : "Edit Ingredient"}
            </Button>
          </Center>
        </FormControl>
      </form>
    </>
  );
};

export default EditCookieIngredientForm;
