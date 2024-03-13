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
  Select,
  Text,
} from "@chakra-ui/react";
import useIngredientItem from "./useIngredientItem";
import { useRef } from "react";
import CancelButton from "../components/CancelButton";
import CheckMarkButton from "../components/CheckMarkButton";
import useAddData from "../hooks/useAddData";
import { INGREDIENTS_ENDOINT } from "../constants";
import { Ingredients } from "./Recipe";

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
  closeForm: () => void;
}

const AddCookieIngredientForm = ({ cookieId, closeForm }: Props) => {
  // get list of ingredients,
  const { data: getIngredientItems } = useIngredientItem();
  const ingredientItems = getIngredientItems?.pages.flatMap(
    (page) => page.results
  );

  const { addData, error, isLoading } = useAddData<Ingredients>({
    endpoint: INGREDIENTS_ENDOINT,
    onSuccessCallback: closeForm,
  });

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

    addData(cookieIngredientData);
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
              {/* Select Element */}
              <Select
                width="50%" // 50% width for the select element
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

              {/* Number Input */}
              <HStack width="50%">
                {" "}
                {/* Adjust width */}
                <Text>Quantity:</Text>
                <NumberInput
                  flex="1" // Let it take remaining space
                  defaultValue="1"
                  ref={ingredientQuantity}
                >
                  <NumberInputField type="number" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>

              {/* Input Element */}
              <Input
                width="20%" // Adjust width
                ref={ingredientUnit}
                backgroundColor="white"
                placeholder="Unit Type"
              />

              {isLoading ? "..." : <CheckMarkButton />}
              <CancelButton onClick={closeForm} />
            </HStack>
          </Box>
        </FormControl>
      </form>
    </>
  );
};

export default AddCookieIngredientForm;
