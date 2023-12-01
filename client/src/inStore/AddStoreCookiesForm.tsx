// Importing necessary dependencies and components
import React, { useRef } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
} from "@chakra-ui/react";
import { AddEditStore } from "./StoreCookie";
import { useReducer } from "react";
import useAddStoreCookie from "./useAddStoreCookie";
import useBaked from "../baked/useBaked";
import AddUpdateFormRadioButtons from "../components/AddUpdateFormRadioButtons";
import addUpdateFormReducer, {
  StartingState,
} from "../reducers/addUpdateFormReducer";
import { format } from "date-fns";
import useEditBaked from "../baked/useEditBaked";
import useDeleteCookies from "../hooks/useDeleteCookies";
import { BAKED_ENDPOINT } from "../constants";
import { EditBaked } from "../baked/Baked";

// Define the Props interface
interface Props {
  id: number;
  cookieSize: string;
}

// Create the AddStoreCookiesForm functional component
const AddStoreCookiesForm = ({ id, cookieSize }: Props) => {
  // Define the initial state for the form
  const initialState: StartingState = {
    cookieValue: 1, // Reset form value
    selectedStoredUsage: "No", // Decides whether the cookie was used
    storedUsageValue: 0, // Tracks cookie value entered by the user
    storedQuantity: 0, // Sets the cookie max value based on selection
  };
  
  // Use a reducer to manage the form state
  const [state, dispatch] = useReducer(addUpdateFormReducer, initialState);
  
  // Destructure state variables for easy access
  const { cookieValue, selectedStoredUsage, storedUsageValue, storedQuantity } = state;
  
  // Define functions to dispatch actions to update state
  const setStoreQuantityValue = (value: number) => {
    dispatch({ type: "set_cookie_value", payload: value });
  };
  const setCookieUsage = (value: string) => {
    dispatch({ type: "set_selected_stored_usage", payload: value });
  };
  const setCookieUsedValue = (value: number) => {
    dispatch({ type: "set_stored_usage_value", payload: value });
  };
  const setCookieQuantity = (value: number) => {
    dispatch({ type: "set_stored_Quantity", payload: value });
  };

  // Create refs for DOM elements
  const storeQuantity = useRef<HTMLInputElement>(null);
  const bakedCookieId = useRef<HTMLSelectElement>(null);
  const bakedCookieUsedQuantity = useRef<HTMLInputElement>(null);

  // Fetch baked cookies data using a custom hook
  const { data: getBakedCookies } = useBaked(id, cookieSize);
  const bakedCookies = getBakedCookies?.pages.flatMap((page) => page.results);

  // Handle baked cookie usage selection
  const handleBakedCookieUsage = (value: string) => setCookieUsage(value);

  // Handle baked cookie selection to set the quantity
  const handleBakedCookieSelection = () => {
    const selectedBakedCookieId = bakedCookieId.current?.value;
    const bakedCookieQuantity = bakedCookies?.find(
      (cookie) => cookie.id === Number(selectedBakedCookieId)
    );
    setCookieQuantity(bakedCookieQuantity ? bakedCookieQuantity?.quantity : 0);
  };

  // Reset the form
  const resetForm = () => {
    if (bakedCookieId.current) bakedCookieId.current.value = '';
    setCookieUsage('No')
    setCookieUsedValue(0)
    setStoreQuantityValue(1)
  };

  // Custom hooks for adding, editing, and deleting cookies
  const { addStoreCookies, error, isLoading } = useAddStoreCookie(resetForm);
  const { editBakedCookie } = useEditBaked(Number(bakedCookieId.current?.value))
  const { deleteItem } = useDeleteCookies(BAKED_ENDPOINT)

  // Handle form submission
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Extract form input values
    const storequantityValue =
      storeQuantity.current?.querySelector("input")?.valueAsNumber;
    const bakedCookieIdValue = bakedCookieId.current?.value;
    const bakedCookieQuantityValue =
      bakedCookieUsedQuantity.current?.querySelector("input")?.valueAsNumber;

    // Create store data object
    const storeData: AddEditStore = {
      cookie_name: id,
      quantity: storequantityValue,
      size: cookieSize,
    };

    // Add store cookies
    addStoreCookies(storeData);

    // Handling cookie delete and edit operations
    if (bakedCookieId.current && bakedCookieUsedQuantity.current) {
      if (storedQuantity === bakedCookieQuantityValue) {
        deleteItem(Number(bakedCookieIdValue));
      } else {
        const newBakedCookieQuantity = storedQuantity - (bakedCookieQuantityValue || 0);
        const bakedCookieData: EditBaked = { quantity: newBakedCookieQuantity };
        editBakedCookie(bakedCookieData);
      }
    }
  };

  // Render the form and UI elements
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
          <Heading paddingBottom={2} size="lg">
            Add Cookies to Store
          </Heading>

          {bakedCookies && bakedCookies?.length > 0 && (
            <AddUpdateFormRadioButtons
              title="Did you bring cookies from the Bakery?"
              usage={selectedStoredUsage}
              handleUsage={handleBakedCookieUsage}
            />
          )}

          {selectedStoredUsage === "Yes" && (
            <Box paddingY={3}>
              <Text fontSize="20px" as="i">
                How Many Cookies?
              </Text>
              <Select
                placeholder="Select Cookies Used"
                ref={bakedCookieId}
                onChange={handleBakedCookieSelection}
                paddingBottom={3}
              >
                {bakedCookies?.map((cookie) => (
                  <option key={cookie.id} value={cookie.id}>
                    Location: {cookie.location} - Quantity: {cookie.quantity} -
                    Date Added:{" "}
                    {format(new Date(cookie.date_added), "MM/dd/yyyy")}
                  </option>
                ))}
              </Select>
              <Text>How much did you use?: </Text>
              <NumberInput
                max={storedQuantity}
                value={storedUsageValue}
                onChange={(value) => setCookieUsedValue(Number(value))}
                width="100%"
                ref={bakedCookieUsedQuantity}
              >
                <NumberInputField type="number" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          )}

          <Box>
            <HStack>
              <Text>Quantity: </Text>
              <NumberInput
                value={cookieValue}
                onChange={(value) => setStoreQuantityValue(Number(value))}
                width="100%"
                ref={storeQuantity}
              >
                <NumberInputField type="number" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
          </Box>
          <Center>
            <Button
              disabled={isLoading}
              type="submit"
              colorScheme="blue"
              marginTop={3}
            >
              {isLoading
                ? "Adding Cookies to Store..."
                : "Add Cookies to Store"}
            </Button>
          </Center>
        </FormControl>
      </form>
    </>
  );
};

export default AddStoreCookiesForm;
