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
  Radio,
  RadioGroup,
  Select,
  Text,
} from "@chakra-ui/react";
import useLocations from "../cookies/useLocations";
import { AddUpdateBaked } from "./Baked";
import { useRef, useState } from "react";
import useAddBaked from "./useAddBaked";
import useDoughs from "../dough/useDoughs";
import { format } from "date-fns";
import useEditDough from "../dough/useEditDough";
import { EditDough } from "../dough/Dough";
import useDeleteCookies from "../hooks/useDeleteCookies";
import { DOUGHS_ENDPOINT } from "../constants";

interface Props {
  id: number;
  cookieSize: string;
}

const AddBakedCookiesForm = ({ id, cookieSize }: Props) => {
  //  state declarations
  const [bakedValue, setBakedValue] = useState(1);
  const [doughUsage, setDoughUsage] = useState("No");
  const [doughUsedValue, setDoughUsedValue] = useState(0); // tracks dough value entered by user
  const [doughQuantity, setDoughQuantity] = useState(0); // sets dough max value based off selection

  //  Ref declarations
  const locationId = useRef<HTMLSelectElement>(null);
  const doughId = useRef<HTMLSelectElement>(null);
  const bakedQuantity = useRef<HTMLInputElement>(null);
  const doughUsedQuantity = useRef<HTMLInputElement>(null);

  // get Locations for Select List
  const { data: getLocations } = useLocations();
  const locations = getLocations?.pages.flatMap((page) => page.results);
  // get doughs for Select List
  const { data: getDoughs } = useDoughs(id);
  const doughs = getDoughs?.pages.flatMap((page) => page.results);

  // reset form function
  const resetForm = () => {
    if (locationId.current) locationId.current.value = "";
    setBakedValue(1);
  };
  // hooks for add, edit, delete operatoins
  const { addBakedCookies, error, isLoading } = useAddBaked(resetForm);
  const { editDough } = useEditDough(Number(doughId.current?.value));
  const { deleteItem } = useDeleteCookies(DOUGHS_ENDPOINT);

  // Determine if dough was used or not
  const handleDoughUsage = (value: string) => setDoughUsage(value);

  // set the quantity of dough from the selected dough
  const handleDoughSelection = () => {
    const selectedDoughId = doughId.current?.value;
    const doughQuantity = doughs?.find(
      (dough) => dough.id === Number(selectedDoughId)
    );
    console.log(doughQuantity?.quantity);
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
    const bakedData: AddUpdateBaked = {
      cookie_name: id,
      quantity: bakedQuantityValue,
      size: cookieSize,
      location_name: parseInt(locationIdValue || "0"), // Assuming a default value if not available
    };
    addBakedCookies(bakedData);

    // Handling dough delete and edit operations
    if (doughId.current && doughUsedQuantity.current) {
      if (doughQuantity === doughQuantityValue) {
        deleteItem(Number(doughIdValue));
      } else {
        const newDoughQuantity = doughQuantity - (doughQuantityValue || 0);
        const doughData: EditDough = { quantity: newDoughQuantity };
        editDough(doughData);
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
            Add Baked Cookies
          </Heading>
          {doughs && doughs?.length > 0 && (
            <Box paddingY={3}>
              <Text fontSize="20px" as="i">
                Did you use any stored dough?
              </Text>
              <RadioGroup defaultValue="No" onChange={handleDoughUsage}>
                <HStack spacing="24px">
                  <Radio value="No">No</Radio>
                  <Radio value="Yes">Yes</Radio>
                </HStack>
              </RadioGroup>
            </Box>
          )}
          {doughUsage === "Yes" && (
            <Box paddingY={3}>
              <Text fontSize="20px" as="i">
                How Many Doughs?
              </Text>
              <Select
                placeholder="Select Dough Used"
                ref={doughId}
                onChange={handleDoughSelection}
                paddingBottom={3}
              >
                {doughs?.map((dough) => (
                  <option key={dough.id} value={dough.id}>
                    Location: {dough.location} - Quantity: {dough.quantity} -
                    Date Added:{" "}
                    {format(new Date(dough.date_added), "MM/dd/yyyy")}
                  </option>
                ))}
              </Select>

              <Text>How much did you use?: </Text>
              <NumberInput
                max={doughQuantity}
                value={doughUsedValue}
                onChange={(value) => setDoughUsedValue(Number(value))}
                width="100%"
                ref={doughUsedQuantity}
              >
                <NumberInputField type="number" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          )}
          <Box paddingY={3}>
            <Text fontSize="20px" as="b">
              How Many Baked Cookies?
            </Text>
            <Select
              placeholder="Select Stored Location"
              ref={locationId}
              paddingBottom={2}
              required
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
                value={bakedValue}
                onChange={(value) => setBakedValue(Number(value))}
                width="100%"
                ref={bakedQuantity}
                isRequired
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
              {isLoading ? "Adding Baked Cookies..." : "Add Baked Cookies"}
            </Button>
          </Center>
        </FormControl>
      </form>
    </>
  );
};

export default AddBakedCookiesForm;
