// Importing necessary dependencies and components
import React, { useReducer, useRef } from "react";
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
  Text,
} from "@chakra-ui/react";
import addUpdateFormReducer, {
  StartingState,
} from "../reducers/addUpdateFormReducer";
import useBaked from "../baked/useBaked";
import useEditBaked from "../baked/useEditBaked";
import { BAKED_ENDPOINT } from "../constants";
import useDeleteCookies from "../hooks/useDeleteCookies";
import useAddStoreCookie from "./useAddStoreCookie";
import useEditStoreCookies from "./useEditStoreCookies";
import { AddEditStore, EditStore } from "./StoreCookie";
import { EditBaked } from "../baked/Baked";
import AddUpdateFormRadioButtons from "../components/AddUpdateFormRadioButtons";
import AddEditFormSelect from "../components/AddEditFormSelect";

interface Props {
  id: number;
  cookieSize: string;
  mode: "add" | "edit";
  inStoreQuantityId: number;
}

const StoreCookiesForm = ({ id, cookieSize, mode, inStoreQuantityId }: Props) => {
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
  const { cookieValue, selectedStoredUsage, storedUsageValue, storedQuantity } =
    state;

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
    if (bakedCookieId.current) bakedCookieId.current.value = "";
    setCookieUsage("No");
    setCookieUsedValue(0);
    setStoreQuantityValue(1);
  };

  // Custom hooks for adding, editing, and deleting cookies
    const {
    editStoreCookies,
    error: editError,
    isLoading: editIsLoading,
  } = useEditStoreCookies(inStoreQuantityId, resetForm);
  const {
    addStoreCookies,
    error: addError,
    isLoading: addIsLoading,
  } = useAddStoreCookie(resetForm);
  const { editBakedCookie } = useEditBaked(
    Number(bakedCookieId.current?.value)
  );
  const { deleteItem } = useDeleteCookies(BAKED_ENDPOINT);

  // Handle form submission
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Extract form input values
    const storeQuantityValue =
      storeQuantity.current?.querySelector("input")?.valueAsNumber;
    const bakedCookieIdValue = bakedCookieId.current?.value;
    const bakedCookieQuantityValue =
      bakedCookieUsedQuantity.current?.querySelector("input")?.valueAsNumber;

    if (mode === "edit") {
      const storeData: EditStore = {
        quantity: storeQuantityValue,
      };
      // Edit mode: Edit store cookies
      editStoreCookies(storeData);
    } else {
      // Create store data object
      const storeData: AddEditStore = {
        cookie_name: id,
        quantity: storeQuantityValue,
        size: cookieSize,
      };
      addStoreCookies(storeData);
    }

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

  return (
    <>
      {(editError || addError) && (
        <Alert status="error">
          <AlertIcon />
          {editError ? editError.message : addError?.message}
        </Alert>
      )}
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <Heading paddingBottom={2} size="lg">
            {mode === "edit" ? `Edit ${cookieSize} Cookies in Store` : "Add Cookies to Store"}
          </Heading>

          {bakedCookies && bakedCookies?.length > 0 && (
            <AddUpdateFormRadioButtons
              title="Did you bring cookies from the Bakery?"
              usage={selectedStoredUsage}
              handleUsage={handleBakedCookieUsage}
            />
          )}

          {selectedStoredUsage === "Yes" && (
            <AddEditFormSelect 
                title='How many cookies?' 
                placeholder='Select Cookies Used' 
                selectRefObject={bakedCookieId} 
                handleSelection={handleBakedCookieSelection}
                cookies={bakedCookies}
                selectedQuantity={storedQuantity}
                selectedValue={storedUsageValue}
                changeValue={setCookieUsedValue}
                inputRefObject={bakedCookieUsedQuantity}
            />
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
              disabled={mode === "edit" ? editIsLoading : addIsLoading}
              type="submit"
              colorScheme="blue"
              marginTop={3}
            >
              {mode === "edit"
                ? editIsLoading
                  ? "Editing Cookies in Store..."
                  : "Edit Cookies in Store"
                : addIsLoading
                ? "Adding Cookies to Store..."
                : "Add Cookies to Store"}
            </Button>
          </Center>
        </FormControl>
      </form>
    </>
  );
};

export default StoreCookiesForm;
