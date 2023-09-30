import { Button, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RiDeleteBin6Fill } from "react-icons/ri";
import APIClient from "../services/api-client";

interface Props {
  endpoint: string;
  id: number;
}

const DeleteCookieButton = ({ endpoint, id }: Props) => {
    const apiClient = new APIClient(endpoint);
  const queryClient = useQueryClient();
  const deleteCookie = useMutation({
    mutationFn: (id: number) =>
      apiClient
        .delete(id)
        .then((res) => res.data),
    onSuccess: (removedCookie) => {
      console.log(removedCookie);
      queryClient.invalidateQueries({
        queryKey: [endpoint],
      });
    },
  });
  return (
    <Button
      width="100%"
      colorScheme="red"
      variant="outline"
      onClick={(event) => {
        event.preventDefault();
        deleteCookie.mutate(id);
      }}
    >
      <RiDeleteBin6Fill size="20px" />
      <Text  paddingLeft={3}>Delete</Text>
    </Button>
  );
};

export default DeleteCookieButton;
