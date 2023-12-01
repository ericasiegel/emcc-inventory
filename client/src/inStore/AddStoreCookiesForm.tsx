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
import { useReducer, useRef } from "react";
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

interface Props {
  id: number;
  cookieSize: string;
}

const AddStoreCookiesForm = ({ id, cookieSize }: Props) => {
  // const [storeQuantityValue, setStoreQuantityValue] = useState(1);
  const initialState: StartingState = {
    cookieValue: 1, // reset form value
    selectedStoredUsage: "No", // decides weather cookie was used
    storedUsageValue: 0, // tracks cookie value entered by user
    storedQuantity: 0, // sets cookie max value based off selection
  };
  const [state, dispatch] = useReducer(addUpdateFormReducer, initialState);
  // Access state variables
  const { cookieValue, selectedStoredUsage, storedUsageValue, storedQuantity } =
    state;
  // Dispatch actions to update state:
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

  const storeQuantity = useRef<HTMLInputElement>(null);
  const bakedCookieId = useRef<HTMLSelectElement>(null);
  const bakedCookieUsedQuantity = useRef<HTMLInputElement>(null);

  const { data: getBakedCookies } = useBaked(id, cookieSize);
  const bakedCookies = getBakedCookies?.pages.flatMap((page) => page.results);

  // Determine if cookies were used or not
  const handleBakedCookieUsage = (value: string) => setCookieUsage(value);

  // set the quantity of dough from the selected dough
  const handleBakedCookieSelection = () => {
    const selectedBakedCookieId = bakedCookieId.current?.value;
    const bakedCookieQuantity = bakedCookies?.find(
      (cookie) => cookie.id === Number(selectedBakedCookieId)
    );
    setCookieQuantity(bakedCookieQuantity ? bakedCookieQuantity?.quantity : 0);
  };

  const resetForm = () => {
    if (bakedCookieId.current) bakedCookieId.current.value = '';
    setCookieUsage('No')
    setCookieUsedValue(0)
    setStoreQuantityValue(1)
  };

  const { addStoreCookies, error, isLoading } = useAddStoreCookie(resetForm);
  const { editBakedCookie } = useEditBaked(Number(bakedCookieId.current?.value))
  const { deleteItem } = useDeleteCookies(BAKED_ENDPOINT)

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const storequantityValue =
      storeQuantity.current?.querySelector("input")?.valueAsNumber;
    const bakedCookieIdValue = bakedCookieId.current?.value;
    const bakedCookieQuantityValue =
      bakedCookieUsedQuantity.current?.querySelector("input")?.valueAsNumber;

    const storeData: AddEditStore = {
      cookie_name: id,
      quantity: storequantityValue,
      size: cookieSize,
    };

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
