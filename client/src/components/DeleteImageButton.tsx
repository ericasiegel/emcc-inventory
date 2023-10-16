import {
    Button,
  } from "@chakra-ui/react";
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { FcRemoveImage } from "react-icons/fc";
  import APIClient from "../services/api-client";
  
  interface Props {
    slug: string;
    id: number;
  }
  
  const DeleteImageButton = ({ slug, id }: Props) => {
    const apiClient = new APIClient('cookies/');
    const queryClient = useQueryClient();
    const deleteItem = useMutation({
      mutationFn: (id: number) => apiClient.deleteImage(slug, id).then((res) => res.data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["cookies"],
        });
      },
    });
  
    // if (deleteItem.isError) {
    //   // Display the error message when a 405 error occurs
    //   return (
    //     <Alert status="error">
    //       <AlertIcon />
    //       <Flex direction="column">
    //         <AlertTitle>Image Can't Be Deleted</AlertTitle>
    //         <AlertDescription>
    //           Delete all associated doughs, baked and store cookies
    //         </AlertDescription>
    //       </Flex>
    //     </Alert>
    //   );
    // }
  
    return (
      <Button
        colorScheme="red"
        variant="unstyled"
        onClick={(event) => {
          event.preventDefault();
          deleteItem.mutate(id);
        }}
      >
        <FcRemoveImage size="25px" />
      </Button>
    );
  };
  
  export default DeleteImageButton;
  