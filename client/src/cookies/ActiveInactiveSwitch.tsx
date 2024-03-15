import {
  Text,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { Cookie } from "./Cookie";
import { COOKIES_ENDPOINT } from "../constants";
import useEditData from "../hooks/useEditData";

interface Props {
  cookie: Cookie;
}

const ActiveInactiveSwitch = ({ cookie }: Props) => {
  const [isActive, setIsActive] = useState(cookie.is_active);

  const { editData, error } = useEditData<Cookie>({
    id: cookie.id,
    endpoint: COOKIES_ENDPOINT,
  });

  const handleSwitchChange = () => {
    setIsActive(!isActive);

    editData({
      ...cookie,
      is_active: !isActive,
    });
  };

  return (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <Flex justifyContent="center" alignItems="center">
        <FormControl paddingTop={4} display="flex" alignItems="center">
          <FormLabel htmlFor={cookie.slug} mb="0">
            {cookie.is_active ? <Text>Active</Text> : <Text>Inactive</Text>}
          </FormLabel>
          <Switch
            id={cookie.slug}
            colorScheme="green"
            isChecked={cookie.is_active}
            onChange={handleSwitchChange}
          />
        </FormControl>
      </Flex>
    </>
  );
};

export default ActiveInactiveSwitch;
