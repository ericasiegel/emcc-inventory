// Importing necessary dependencies and components
import React, { useReducer, useRef } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Center,
  FormControl,
  HStack,
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
import { BAKED_ENDPOINT, STORE_ENDPOINT } from "../constants";
import useDeleteCookies from "../hooks/useDeleteCookies";
import { EditStore, Store } from "./StoreCookie";
import { Baked, EditBaked } from "../baked/Baked";
import AddUpdateFormRadioButtons from "../components/AddUpdateFormRadioButtons";
import AddEditFormSelect from "../components/AddEditFormSelect";
import useGetData from "../hooks/useGetData";
import CheckMarkButton from "../components/CheckMarkButton";
import CancelButton from "../components/CancelButton";
import useAddData from "../hooks/useAddData";
import useEditData from "../hooks/useEditData";

interface Props {
  id: number;
  cookieSize: string;
  mode: "add" | "edit";
  inStoreQuantityId?: number;
  closeForm: () => void;
}

const defaultStoreData = {
  id: 0,
  cookie: "",
  cookie_id: 0,
  size: "",
  quantity: 0,
  last_updated: "",
  updated_by: {
    username: "",
  },
};

const StoreCookiesForm = ({
  id,
  cookieSize,
  mode,
  inStoreQuantityId,
  closeForm,
}: Props) => {
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
  const setCookieQuantity = (value: number | undefined) => {
    dispatch({ type: "set_stored_Quantity", payload: value });
  };

  // Create refs for DOM elements
  const storeQuantity = useRef<HTMLInputElement>(null);
  const bakedCookieId = useRef<HTMLSelectElement>(null);
  const bakedCookieUsedQuantity = useRef<HTMLInputElement>(null);

  // Fetch baked cookies data using a custom hook
  const { data: getBakedCookies } = useGetData<Baked>({
    endpoint: BAKED_ENDPOINT,
    id,
    size: cookieSize,
  });
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

  // Custom hooks for adding, editing, and deleting cookies
  const {
    addData,
    error: addError,
    isLoading: addIsLoading,
  } = useAddData<Store>({
    endpoint: STORE_ENDPOINT,
    onSuccessCallback: closeForm,
  });
  const {
    editData: editStoreCookies,
    error: editError,
    isLoading: editIsLoading,
  } = useEditData<EditStore>({
    id: inStoreQuantityId!,
    endpoint: STORE_ENDPOINT,
    onSuccessCallback: closeForm,
  });
  const { editData: editBakedCookie } = useEditData<EditBaked>({
    id: Number(bakedCookieId.current?.value),
    endpoint: BAKED_ENDPOINT,
    onSuccessCallback: closeForm,
  });
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
      const storeData = {
        ...defaultStoreData,
        cookie_id: id,
        quantity: storeQuantityValue,
        size: cookieSize,
      };
      addData(storeData);
    }

    // Handling cookie delete and edit operations
    if (bakedCookieId.current && bakedCookieUsedQuantity.current) {
      if (storedQuantity === bakedCookieQuantityValue) {
        deleteItem(Number(bakedCookieIdValue));
      } else {
        const newBakedCookieQuantity =
          storedQuantity - (bakedCookieQuantityValue || 0);
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
          {bakedCookies && bakedCookies?.length > 0 && (
            <AddUpdateFormRadioButtons
              title="Did you bring cookies from the Bakery?"
              usage={selectedStoredUsage}
              handleUsage={handleBakedCookieUsage}
            />
          )}

          {selectedStoredUsage === "Yes" && (
            <AddEditFormSelect
              title="How many cookies?"
              placeholder="Select Cookies Used"
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
                borderColor='black'
              >
                <NumberInputField type="number" />
                <NumberInputStepper>
                  <NumberIncrementStepper borderColor='black' />
                  <NumberDecrementStepper borderColor='black' />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
          </Box>
          <Center>
            {mode === "edit" ? (
              editIsLoading ? (
                "Editing Cookies in Store..."
              ) : (
                <CheckMarkButton />
              )
            ) : addIsLoading ? (
              "Adding Cookies to Store..."
            ) : (
              <CheckMarkButton />
            )}
            <CancelButton onClick={closeForm} />
          </Center>
        </FormControl>
      </form>
    </>
  );
};

export default StoreCookiesForm;
