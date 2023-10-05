import {
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
  import APIClient, { AddUpdateStore } from "../services/api-client";
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { useRef } from "react";
  
  interface Props {
      id: number
      cookieSize: string;
  }
  
  const AddStoreCookiesForm = ({id, cookieSize}: Props) => {
  
    const apiClient = new APIClient("store/");
    const queryClient = useQueryClient();
    const addStoreCookies = useMutation({
      mutationFn: (store: AddUpdateStore) =>
        apiClient.addStore(store).then((res) => res.data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["store"],
        });
      },
    });
  
    const storeQuantity = useRef<HTMLInputElement>(null);
    
  
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const storequantityValue = storeQuantity.current?.querySelector('input')?.valueAsNumber;

      const storeData: AddUpdateStore = {
        cookie_name: id,
        quantity: (storequantityValue),
        size: cookieSize,
      };
  
      addStoreCookies.mutate(storeData);
    };
  
    return (
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <Heading paddingBottom={2} size='lg'>Add Cookies to Store</Heading>
          <Box>
            <HStack>
              <Text>Quantity: </Text>
              <NumberInput defaultValue={1} width="100%" ref={storeQuantity}>
                <NumberInputField type="number" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
          </Box>
          <Center>
            <Button type="submit" colorScheme="blue" marginTop={3}>
              Add Cookies
            </Button>
          </Center>
        </FormControl>
      </form>
    );
  };
  
  export default AddStoreCookiesForm;
  