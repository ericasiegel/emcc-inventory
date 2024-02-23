import { Flex, Image } from "@chakra-ui/react";
import AddImageForm from "./AddImageForm";
import DeleteImageButton from "./DeleteImageButton";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import { useState } from "react";
import AddImageButton from "./AddImageButton";

interface Props {
  image?: string | null;
  description?: string;
  id: number;
}

const CookieImage = ({ image, description, id }: Props) => {
  const [openForm, setOpenForm] = useState(false);
  const imgUrl = image ? image : noImage;

  return (
    <>
      <Flex justifyContent="flex-end">
        {image === null ? (
          openForm ? (
            <AddImageForm id={id} onCancel={() => setOpenForm(false)} />
          ) : (
            <AddImageButton onClick={() => setOpenForm(true)} />
          )
        ) : (
          <DeleteImageButton id={id} />
        )}
      </Flex>
      <Image
        margin="0 auto" // Center horizontally using margin auto
        display="block"
        padding={4}
        src={imgUrl}
        alt={description}
        maxW="50%"
        height="auto"
        borderRadius="full"
        overflow="hidden"
        boxShadow="dark-lg"
        background="#941c3e"
        p="2"
      />
    </>
  );
};

export default CookieImage;
