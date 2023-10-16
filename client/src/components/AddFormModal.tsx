import { ReactNode } from "react";
import AddButton from "./AddButton";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import AddImageButton from "./AddImageButton";

interface Props {
  children: ReactNode;
  header: string;
}

const AddFormModal = ({ children, header }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    {header === 'Add Image' ? <AddImageButton onClick={onOpen} /> : <AddButton onClick={onOpen} />}
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddFormModal;
