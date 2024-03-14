import {
  Alert,
  AlertIcon,
  Box,
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
import { Dough } from "./Dough";
import { useReducer, useRef } from "react";
import addUpdateFormReducer, {
  StartingState,
} from "../reducers/addUpdateFormReducer";
import CancelButton from "../components/CancelButton";
import CheckMarkButton from "../components/CheckMarkButton";
import useAddData from "../hooks/useAddData";
import { DOUGHS_ENDPOINT } from "../constants";

const defaultDough = {
  id: 0,
  cookie: "",
  cookie_id: 0,
  quantity: 0,
  location: "",
  location_id: 0,
  date_added: "",
};

interface Props {
  id: number;
  // counts: number;
  closeForm: () => void;
}

const AddDoughForm = ({ id, closeForm }: Props) => {
  const { data: getLocations } = useLocations();
  const locations = getLocations?.pages.flatMap((page) => page.results);

  const initialState: StartingState = {
    cookieValue: 1,
    selectedStoredUsage: "",
    storedUsageValue: 0,
    storedQuantity: 0,
  };
  const [state, dispatch] = useReducer(addUpdateFormReducer, initialState);
  const { cookieValue } = state;

  const setDoughQuantityValue = (value: number) => {
    dispatch({ type: "set_cookie_value", payload: value });
  };

  const { addData, error, isLoading } = useAddData<Dough>({
    endpoint: DOUGHS_ENDPOINT,
    onSuccessCallback: closeForm,
  });

  const locationId = useRef<HTMLSelectElement>(null);
  const doughQuantity = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const locationIdValue = locationId.current?.value;
    const doughquantityValue =
      doughQuantity.current?.querySelector("input")?.valueAsNumber;

    const doughData = {
      ...defaultDough,
      cookie_id: id,
      quantity: doughquantityValue,
      location_id: parseInt(locationIdValue!),
    };

    addData(doughData);
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
              <Select
                placeholder="Select Location"
                ref={locationId}
                borderColor="black"
              >
                {locations?.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.title}
                  </option>
                ))}
              </Select>
              <Text paddingStart={6}>Quantity: </Text>
              <NumberInput
                value={cookieValue}
                onChange={(value) => setDoughQuantityValue(Number(value))}
                width="100%"
                ref={doughQuantity}
                borderColor="black"
              >
                <NumberInputField type="number" />
                <NumberInputStepper>
                  <NumberIncrementStepper borderColor="black" />
                  <NumberDecrementStepper borderColor="black" />
                </NumberInputStepper>
              </NumberInput>
              {isLoading ? "..." : <CheckMarkButton />}
              <CancelButton onClick={closeForm} />
            </HStack>
          </Box>
        </FormControl>
      </form>
    </>
  );
};

export default AddDoughForm;
