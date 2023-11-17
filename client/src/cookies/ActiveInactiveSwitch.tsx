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
import APIClient from "../services/api-client";
import { Cookie } from "./Cookie";
import useMutateCookies from "../hooks/useMutateCookies";
import { COOKIES_ENDPOINT } from "../constants";

interface Props {
  cookie: Cookie
}

const ActiveInactiveSwitch = ({cookie}: Props ) => {
  const apiClient = new APIClient(COOKIES_ENDPOINT + "/");

  const { mutate: activateCookie, error } = useMutateCookies<
    Cookie,
    Error,
    Cookie
  >(
    (updatedCookie: Cookie) => apiClient.patch(updatedCookie, cookie.id),
    () => {},
    [COOKIES_ENDPOINT]
  );

  const [isActive, setIsActive] = useState(cookie.is_active);

  const handleSwitchChange = () => {
    setIsActive(!isActive);

    activateCookie({
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
