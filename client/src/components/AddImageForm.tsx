import { Center, Input, Button, Box } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import APIClient, { AddImage } from "../services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  slug: string;
}

const AddImageForm = ({ slug }: Props) => {
  const apiClient = new APIClient("cookies/");
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const uploadImage = useMutation({
    mutationFn: (image: AddImage) =>
      apiClient.uploadImage(image, slug).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cookies"],
      });
    },
  });

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
        }
        
      uploadImage.mutate(addImagePayload)
      console.log("Uploading file:", selectedFile.name);
    }
  };

  return (
    <Center>
      <Box>
        <form onSubmit={handleUpload}> {/* Wrap the input and button in a <form> */}
          <Input
            type="file"
            accept="image/*"
            variant="unstyled"
            onChange={handleFileChange}
            marginBottom="1rem"
          />
          <Button
            type="submit"
            colorScheme="teal"
            isDisabled={!selectedFile}
          >
            Upload
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default AddImageForm;
