import { Center, Input, Button, Box, Alert, AlertIcon } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import APIClient from "../services/api-client";
import { AddImage } from "../entities/Image";
import { Image } from "../entities/Image";
import useMutateCookies from "../hooks/useMutateCookies";
import { CACHE_KEY_COOKIES } from "../constants";

interface Props {
  slug: string;
}

const AddImageForm = ({ slug }: Props) => {
  const apiClient = new APIClient("cookies/");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    mutate: uploadImage,
    error,
    isLoading,
  } = useMutateCookies<Image, Error, AddImage>(
    // apiClient,
    (image: AddImage) =>
      apiClient.uploadImage(image, slug).then((res) => res.data),
    () => {},
    [CACHE_KEY_COOKIES]
  );

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
      <Center>
        <Box>
          <form onSubmit={handleUpload}>
            {" "}
            {/* Wrap the input and button in a <form> */}
            <Input
              type="file"
              accept="image/*"
              variant="unstyled"
              onChange={handleFileChange}
              marginBottom="1rem"
            />
            <Button
              disabled={isLoading}
              type="submit"
              colorScheme="teal"
              isDisabled={!selectedFile}
            >
              {isLoading ? "Adding Image..." : "Add Image"}
            </Button>
          </form>
        </Box>
      </Center>
    </>
  );
};

export default AddImageForm;
