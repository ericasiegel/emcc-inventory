import { ReactNode } from "react";
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  // ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import AddButton from "./AddButton";
import EditButton from "./EditButton";
import AddImageButton from "../cookieImage/AddImageButton";

interface Props {
  children: ReactNode;
  header?: string;
  isAddForm?: boolean;
}

const FormModal = ({ children, header, isAddForm }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderTriggerButton = () => {
    if (isAddForm) {
      return <AddButton onClick={onOpen} />;
    } else {
      return <EditButton onClick={onOpen} />;
    }
  };

  const renderModalContent = () => {
    return (
      <>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>
            <Heading size="lg">
              {header}
            </Heading>
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>{children}</ModalBody>
          <ModalFooter justifyContent="center">
            <Button variant="ghost" size="md" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </>
    );
  };

  return (
    <>
      {isAddForm && header === "Add Image" ? (
        <AddImageButton onClick={onOpen} />
      ) : (
        renderTriggerButton()
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default FormModal;