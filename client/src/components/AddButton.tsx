import { IconButton } from '@chakra-ui/react';
import { IoMdAddCircleOutline } from 'react-icons/io'

const AddButton = () => {
  return (
    <IconButton
      size="sm"
      marginY={1}
      colorScheme="green"
      aria-label="Delete"
      icon={<IoMdAddCircleOutline size='25px' />}
    />
  )
}

export default AddButton