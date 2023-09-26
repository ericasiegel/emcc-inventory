import { IconButton } from '@chakra-ui/react'
import {RiDeleteBin6Fill} from 'react-icons/ri'

const DeleteButton = () => {
  return (
    <IconButton
    size="sm"
    marginY={1}
    colorScheme="red"
    aria-label="Delete"
    icon={<RiDeleteBin6Fill />}
    onClick={() => {
      // Handle the click event here
    }}
  />
  )
}

export default DeleteButton