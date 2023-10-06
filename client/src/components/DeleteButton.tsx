import { Button, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsTrash } from "react-icons/bs";
import APIClient from "../services/api-client";

interface Props {
  endpoint: string;
  id: number;
}

const DeleteButton = ({ endpoint, id }: Props) => {
    const apiClient = new APIClient(endpoint);
  const queryClient = useQueryClient();
  const deleteItem = useMutation({
    mutationFn: (id: number) =>
      apiClient
        .delete(id)
        .then((res) => res.data),
    onSuccess: (removedItem) => {
      console.log(removedItem);
      queryClient.invalidateQueries({
        queryKey: [endpoint],
      });
      queryClient.invalidateQueries({
          queryKey: ["cookies"],
        });
    },
  });
  return (
    <Button
      colorScheme="red"
      variant='unstyled'
      onClick={(event) => {
        event.preventDefault();
        deleteItem.mutate(id);
      }}
    >
      <BsTrash size="25px" color='red' />
      {/* <Text  paddingLeft={3}>Delete</Text> */}
    </Button>
  );
};

export default DeleteButton;
