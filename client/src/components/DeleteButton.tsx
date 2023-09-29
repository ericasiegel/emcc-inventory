import { IconButton } from '@chakra-ui/react';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { useQueryClient } from '@tanstack/react-query';
import APIClient from '../services/api-client'; // Import your APIClient class

interface Props {
  id: number;
  endpoint: string;
}

const DeleteButton = ({ id, endpoint }: Props) => {
  const apiClient = new APIClient<any>(endpoint); // Use 'any' as the type since it's a generic component
  const queryClient = useQueryClient(); // Access the query client

  const handleDelete = async () => {
    try {
      // Call the API client's delete method
      await apiClient.delete(id);

      // Invalidate the corresponding query to trigger a refetch
      queryClient.invalidateQueries([endpoint, id]);
    } catch (error) {
      console.error('Error deleting item:', error);
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
