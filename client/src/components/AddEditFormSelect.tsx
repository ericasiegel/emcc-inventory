import {
  Select,
  Text,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { Dough } from "../dough/Dough";
import { Baked } from "../baked/Baked";

interface Props {
  title: string;
  placeholder: string;
  selectRefObject: React.RefObject<HTMLSelectElement>;
  handleSelection: () => void;
  cookies: Dough[] | Baked[] | undefined;
  selectedQuantity: number;
  selectedValue: number;
  changeValue: (value: number) => void;
  inputRefObject: React.RefObject<HTMLInputElement>;
}

const AddEditFormSelect = ({
  title,
  placeholder,
  selectRefObject,
  handleSelection,
  cookies,
  selectedQuantity,
  selectedValue,
  changeValue,
  inputRefObject,
}: Props) => {
  return (
    <Box paddingY={3}>
      <Text fontSize="20px" as="i">
        {title}
      </Text>
      <Select
        placeholder={placeholder}
        ref={selectRefObject}
        onChange={handleSelection}
        paddingBottom={3}
      >
        {cookies?.map((cookie) => (
          <option key={cookie.id} value={cookie.id}>
            Location: {cookie.location} - Quantity: {cookie.quantity} - Date
            Added: {format(new Date(cookie.date_added), "MM/dd/yyyy")}
          </option>
        ))}
      </Select>
      <Text>How much did you use?: </Text>
      <NumberInput
        max={selectedQuantity}
        value={selectedValue}
        onChange={(value) => changeValue(Number(value))}
        width="100%"
        ref={inputRefObject}
      >
        <NumberInputField type="number" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Box>
  );
};

export default AddEditFormSelect;
