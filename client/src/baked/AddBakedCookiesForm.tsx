import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
} from "@chakra-ui/react";
import useLocations from "../cookies/useLocations";
import { AddUpdateBaked, Baked } from "./Baked";
import { useReducer, useRef } from "react";
import useAddBaked from "./useAddBaked";
import useEditDough from "../dough/useEditDough";
import { Dough, EditDough } from "../dough/Dough";
import useDeleteCookies from "../hooks/useDeleteCookies";
import { BAKED_ENDPOINT, DOUGHS_ENDPOINT } from "../constants";
import addUpdateFormReducer, {
  StartingState,
} from "../reducers/addUpdateFormReducer";
import AddUpdateFormRadioButtons from "../components/AddUpdateFormRadioButtons";
import AddEditFormSelect from "../components/AddEditFormSelect";
import useGetData from "../hooks/useGetData";
import CancelButton from "../components/CancelButton";
import CheckMarkButton from "../components/CheckMarkButton";
import useAddData from "../hooks/useAddData";
import useEditData from "../hooks/useEditData";

interface Props {
  id: number;
  cookieSize: string;
  closeForm: () => void;
}

const defaultBaked = {
  id: 0,
  cookie: "",
  cookie_id: 0,
  size: "",
  quantity: 0,
  location: "",
  location_id: 0,
  date_added: "",
};

const AddBakedCookiesForm = ({ id, cookieSize, closeForm }: Props) => {
  //  state declarations
  const initialState: StartingState = {
    cookieValue: 1, // reset form value
    selectedStoredUsage: "No", // decides weather dough was used
    storedUsageValue: 0, // tracks dough value entered by user
    storedQuantity: 0, // sets dough max value based off selection
  };

  const [state, dispatch] = useReducer(addUpdateFormReducer, initialState);
  // Access state variables
  const { cookieValue, selectedStoredUsage, storedUsageValue, storedQuantity } =
    state;
  // Dispatch actions to update state:
  const setBakedValue = (value: number) => {
    dispatch({ type: "set_cookie_value", payload: value });
  };
  const setDoughUsage = (value: string) => {
    dispatch({ type: "set_selected_stored_usage", payload: value });
  };
  const setDoughUsedValue = (value: number) => {
    dispatch({ type: "set_stored_usage_value", payload: value });
  };
  const setDoughQuantity = (value: number | undefined) => {
    dispatch({ type: "set_stored_Quantity", payload: value });
  };

  //  Ref declarations
  const locationId = useRef<HTMLSelectElement>(null);
  const doughId = useRef<HTMLSelectElement>(null);
  const bakedQuantity = useRef<HTMLInputElement>(null);
  const doughUsedQuantity = useRef<HTMLInputElement>(null);

  // get Locations for Select List
  const { data: getLocations } = useLocations();
  const locations = getLocations?.pages.flatMap((page) => page.results);
  // get doughs for Select List
  const { data: getDoughs } = useGetData<Dough>({
    endpoint: DOUGHS_ENDPOINT,
    id,
  });
  const doughs = getDoughs?.pages.flatMap((page) => page.results);

  // hooks for add, edit, delete operatoins
  const { addData, error, isLoading } = useAddData<Baked>({
    endpoint: BAKED_ENDPOINT,
    onSuccessCallback: closeForm,
  });
  const { editData } = useEditData({
    id: Number(doughId.current?.value),
    endpoint: DOUGHS_ENDPOINT,
    onSuccessCallback: closeForm,
  });
  const { deleteItem } = useDeleteCookies(DOUGHS_ENDPOINT);

  // Determine if dough was used or not
  const handleDoughUsage = (value: string) => setDoughUsage(value);

  // set the quantity of dough from the selected dough
  const handleDoughSelection = () => {
    const selectedDoughId = doughId.current?.value;
    const doughQuantity = doughs?.find(
      (dough) => dough.id === Number(selectedDoughId)
    );
    setDoughQuantity(doughQuantity ? doughQuantity?.quantity : 0);
  };

  // handle form submission
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Extracting values from refs
    const locationIdValue = locationId.current?.value;
    const doughIdValue = doughId.current?.value;
    const bakedQuantityValue =
      bakedQuantity.current?.querySelector("input")?.valueAsNumber;
    const doughQuantityValue =
      doughUsedQuantity.current?.querySelector("input")?.valueAsNumber;

    // Prepare bakedData and add baked cookies
    const bakedData = {
      ...defaultBaked,
      cookie_id: id,
      quantity: bakedQuantityValue,
      size: cookieSize,
      location_id: parseInt(locationIdValue || "0"), // Assuming a default value if not available
    };
    addData(bakedData);

    // Handling dough delete and edit operations
    if (doughId.current && doughUsedQuantity.current) {
      if (storedQuantity === doughQuantityValue) {
        deleteItem(Number(doughIdValue));
      } else {
        const newDoughQuantity = storedQuantity - (doughQuantityValue || 0);
        const doughData = { quantity: newDoughQuantity };
        editData(doughData);
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
          {doughs && doughs?.length > 0 && (
            <AddUpdateFormRadioButtons
              title="Did you use any stored dough?"
              usage={selectedStoredUsage}
              handleUsage={handleDoughUsage}
            />
          )}

          {selectedStoredUsage === "Yes" && (
            <AddEditFormSelect
              title="How many doughs?"
              placeholder="Select Doughs Used"
              selectRefObject={doughId}
              handleSelection={handleDoughSelection}
              cookies={doughs}
              selectedQuantity={storedQuantity}
              selectedValue={storedUsageValue}
              changeValue={setDoughUsedValue}
              inputRefObject={doughUsedQuantity}
            />
          )}

          <Box paddingY={3}>
            <Text fontSize="20px" as="b">
              How Many Baked Cookies?
            </Text>
            <Select
              placeholder="Select Stored Location"
              ref={locationId}
              marginBottom={2}
              required
              borderColor="black"
            >
              {locations?.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.title}
                </option>
              ))}
            </Select>
            <HStack>
              <Text>Quantity: </Text>
              <NumberInput
                value={cookieValue}
                onChange={(value) => setBakedValue(Number(value))}
                width="100%"
                ref={bakedQuantity}
                isRequired
                borderColor="black"
              >
                <NumberInputField type="number" />
                <NumberInputStepper>
                  <NumberIncrementStepper borderColor="black" />
                  <NumberDecrementStepper borderColor="black" />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
          </Box>
          <Center>
            {isLoading ? "..." : <CheckMarkButton />}
            <CancelButton onClick={closeForm} />
          </Center>
        </FormControl>
      </form>
    </>
  );
};

export default AddBakedCookiesForm;
