import { IconButton, useToast } from '@chakra-ui/react';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import APIClient from "../services/api-client"


interface Props {
  id: number;
  endpoint: string; // Specify the endpoint for each type of item (e.g., '/doughs', '/bakedcookies', '/storecookies')
}

const DeleteButton = ({ id, endpoint }: Props) => {
  const toast = useToast();

  const handleDelete = async () => {
    try {
      // Use the APIClient to make the DELETE request
      const apiClient = new APIClient(endpoint); // Use 'any' as the type since it's a generic component
      await apiClient.delete(id); // Assuming you have a 'delete' method in your APIClient

      toast({
        title: 'Item Deleted',
        description: `Item with ID ${id} has been deleted successfully.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while deleting the item.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <IconButton
      size="sm"
      marginY={1}
      colorScheme="red"
      aria-label="Delete"
      icon={<RiDeleteBin6Fill />}
      onClick={handleDelete}
    />
  );
};

export default DeleteButton;
