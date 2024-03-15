import {
  Input,
  Button,
  Box,
  Alert,
  AlertIcon,
  HStack,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import useAddImage from "./useAddImage";
import { AddImage } from "../cookies/Cookie";
import CancelButton from "../components/CancelButton";
import { FaRegCircleCheck } from "react-icons/fa6";

interface Props {
  id: number;
  onCancel: () => void;
}

const AddImageForm = ({ id, onCancel }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { uploadImage, error, isLoading } = useAddImage(id);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
    } else {
      setSelectedFile(null); // Set to null when no file is selected
    }
  };

  const handleUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      const addImagePayload: AddImage = {
        image: selectedFile,
      };

      uploadImage(addImagePayload);
      console.log("Uploading file:", selectedFile.name);
    }
  };

  return (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
        <Box paddingBottom={5} width='100%'>
          <form onSubmit={handleUpload}>
            {" "}
            <HStack>
              <Input
                type="file"
                accept="image/*"
                variant="outline"
                onChange={handleFileChange}
                paddingY={2}
                size='lg'
              />
              <Button
                disabled={isLoading}
                type="submit"
                variant="unstyled"
                isDisabled={!selectedFile}
              >
                <FaRegCircleCheck size={30} color="green" />
              </Button>
              <CancelButton onClick={onCancel} />
            </HStack>
          </form>
        </Box>
    </>
  );
};

export default AddImageForm;
