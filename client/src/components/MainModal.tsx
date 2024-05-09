import { ReactNode } from "react";
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface Props {
  children: ReactNode;
  header?: string;
  isOpen: boolean;
  onClose: () => void;
}

const MainModal = ({ children, header, onClose, isOpen }: Props) => {

  const renderModalContent = () => {
    return (
      <>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            <Heading size="lg">{header}</Heading>
          </ModalHeader>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default MainModal;