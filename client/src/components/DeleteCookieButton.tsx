import { Button } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Cookie } from "../entities/Cookie";

interface Props {
    id: number
}

const DeleteCookieButton = ({id}: Props) => {
  const queryClient = useQueryClient();
  const deleteCookie = useMutation({
    mutationFn: (id: number) =>
      axios
        .delete<Cookie>(`http://127.0.0.1:8000/bakery/cookies/${id}`)
        .then((res) => res.data),
    onSuccess: (removedCookie) => {
      console.log(removedCookie);
      queryClient.invalidateQueries({
        queryKey: ["cookies"],
      });
    },
  });
  return (
    <Button width='100%' colorScheme="red" variant="outline" onClick={event => {
        event.preventDefault();
        deleteCookie.mutate(id)
    }}>
      <RiDeleteBin6Fill size="20px" />
      Delete Cookie
    </Button>
  );
};

export default DeleteCookieButton;
