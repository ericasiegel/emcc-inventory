import { IconButton } from '@chakra-ui/react';
import { IoMdAddCircleOutline } from 'react-icons/io'

interface Props {
    onClick: () => void;
}

const AddButton = ({ onClick }: Props) => {
  return (
    <IconButton
      size="sm"
      marginY={1}
      colorScheme="green"
      aria-label="Delete"
      icon={<IoMdAddCircleOutline size='25px' />}
      onClick={onClick}
    />
  )
}

export default AddButton