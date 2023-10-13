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
  import APIClient, { EditStore } from "../services/api-client";
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { useRef } from "react";
  
  interface Props {
      id: number
      cookieSize: string;
  }
  
  const EditStoreCookiesForm = ({id, cookieSize}: Props) => {
  
    const apiClient = new APIClient("store/");
    const queryClient = useQueryClient();
    const editStoreCookies = useMutation({
      mutationFn: (store: EditStore) =>
        apiClient.editStore(store, id).then((res) => res.data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["store"],
        });
        queryClient.invalidateQueries({
          queryKey: ["cookies"],
        });
      },
    });
  
    const storeQuantity = useRef<HTMLInputElement>(null);
    
  
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const storequantityValue = storeQuantity.current?.querySelector('input')?.valueAsNumber;

      const storeData: EditStore = {
        quantity: (storequantityValue),
      };
  
      editStoreCookies.mutate(storeData);
    };
  
    return (
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <Heading paddingBottom={2} size='lg'>Edit {cookieSize} Cookies in Store</Heading>
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
              Edit Cookies
            </Button>
          </Center>
        </FormControl>
      </form>
    );
  };
  
  export default EditStoreCookiesForm;
  